import {
  Injectable,
  Inject,
  OnApplicationBootstrap,
  Logger,
} from '@nestjs/common';
import { TERMINUS_MODULE_OPTIONS, TERMINUS_LIB } from './terminus.constants';
import {
  TerminusModuleOptions,
  HealthIndicatorFunction,
  TerminusEndpoint,
} from './interfaces';
import { HttpAdapterHost, ApplicationConfig } from '@nestjs/core';
import { Server } from 'http';
import { HealthCheckError, Terminus, HealthCheckMap } from '@godaddy/terminus';
import { validatePath } from '@nestjs/common/utils/shared.utils';

/**
 * Bootstraps the third party Terminus library with the
 * configured Module options
 */
@Injectable()
export class TerminusBootstrapService implements OnApplicationBootstrap {
  /**
   * The http server of NestJS
   */
  private httpServer!: Server;
  /**
   * The NestJS logger
   */
  private readonly logger = new Logger(TerminusBootstrapService.name, true);

  constructor(
    @Inject(TERMINUS_MODULE_OPTIONS)
    private readonly options: TerminusModuleOptions,
    @Inject(TERMINUS_LIB)
    private readonly terminus: Terminus,
    private readonly refHost: HttpAdapterHost<any>,
    private readonly applicationConfig: ApplicationConfig,
  ) {}

  /**
   * Executes the given health indicators and stores the caused
   * errors and results
   * @param healthIndicators The health indicators which should get executed
   */
  private async executeHealthIndicators(
    healthIndicators: HealthIndicatorFunction[],
  ): Promise<{ results: any[]; errors: any[] }> {
    const results: any[] = [];
    const errors: any[] = [];
    await Promise.all(
      healthIndicators
        // Register all promises
        .map(healthIndicator => healthIndicator())
        .map((p: Promise<any>) =>
          p.catch((error: any) => {
            // Is not an expected error. Throw further!
            if (!error.causes) throw error;
            // Is a expected health check error
            errors.push((error as HealthCheckError).causes);
          }),
        )
        .map((p: Promise<any>) =>
          p.then((result: any) => result && results.push(result)),
        ),
    );

    return { results, errors };
  }

  /**
   * Logs an error message of terminus
   * @param message The log message
   * @param error The error which was thrown
   */
  private logError(message: string, error: HealthCheckError | Error) {
    if ((error as HealthCheckError).causes) {
      const healthError: HealthCheckError = error as HealthCheckError;
      message = `${message} ${JSON.stringify(healthError.causes)}`;
    }
    this.logger.error(message, error.stack);
  }

  /**
   * Logs the health check registration to the logger
   * @param healthChecks The health check map to log
   */
  private logHealthCheckRegister(healthChecks: HealthCheckMap) {
    Object.keys(healthChecks).forEach(endpoint =>
      this.logger.log(
        `Mapped {${endpoint}, GET} healthcheck route`,
        'TerminusExplorer',
      ),
    );
  }

  private getHealthCheckExecutor(
    endpoint: TerminusEndpoint,
  ): () => Promise<any> {
    return async () => {
      const { results, errors } = await this.executeHealthIndicators(
        endpoint.healthIndicators,
      );

      const info = (results || [])
        .concat(errors || [])
        .reduce(
          (previous: Object, current: Object) =>
            Object.assign(previous, current),
          {},
        );

      if (errors.length) {
        throw new HealthCheckError('Healthcheck failed', info);
      } else {
        return info;
      }
    };
  }

  private validateEndpointUrl(endpoint: TerminusEndpoint): string {
    const prefix = this.applicationConfig.getGlobalPrefix();

    const shouldUseGlobalPrefix =
      prefix &&
      (endpoint.useGlobalPrefix
        ? endpoint.useGlobalPrefix
        : this.options.useGlobalPrefix &&
          endpoint.useGlobalPrefix === undefined);

    let url = validatePath(endpoint.url);

    if (shouldUseGlobalPrefix) {
      url = validatePath(prefix) + url;
    }

    return url;
  }

  /**
   * Returns the health check map using the configured health
   * indicators
   */
  public getHealthChecksMap(): HealthCheckMap {
    return this.options.endpoints.reduce(
      (healthChecks, endpoint) => {
        const url = this.validateEndpointUrl(endpoint);
        healthChecks[url] = this.getHealthCheckExecutor(endpoint);
        return healthChecks;
      },
      {} as HealthCheckMap,
    );
  }

  /**
   * Bootstraps the third party terminus library with
   * the given module options
   */
  private bootstrapTerminus() {
    const healthChecks = this.getHealthChecksMap();
    this.terminus(this.httpServer, {
      healthChecks,
      // Use the logger of the user
      // or by the default logger if is not defined
      logger: this.options.logger || this.logError.bind(this),
    });
    this.logHealthCheckRegister(healthChecks);
  }

  /**
   * Gets called when the application gets bootstrapped.
   */
  public onApplicationBootstrap() {
    this.httpServer = this.refHost.httpAdapter.getHttpServer();
    this.bootstrapTerminus();
  }
}
