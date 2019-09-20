'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@nestjs/terminus documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/TerminusModule.html" data-type="entity-link">TerminusModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TerminusModule-46e36634180ce53e7f8e16f1df9e6c31"' : 'data-target="#xs-injectables-links-module-TerminusModule-46e36634180ce53e7f8e16f1df9e6c31"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TerminusModule-46e36634180ce53e7f8e16f1df9e6c31"' :
                                        'id="xs-injectables-links-module-TerminusModule-46e36634180ce53e7f8e16f1df9e6c31"' }>
                                        <li class="link">
                                            <a href="injectables/DNSHealthIndicator.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DNSHealthIndicator</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DiskHealthIndicator.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DiskHealthIndicator</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GRPCHealthIndicator.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GRPCHealthIndicator</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MemoryHealthIndicator.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MemoryHealthIndicator</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MicroserviceHealthIndicator.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MicroserviceHealthIndicator</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MongooseHealthIndicator.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MongooseHealthIndicator</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TypeOrmHealthIndicator.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TypeOrmHealthIndicator</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ConnectionNotFoundError.html" data-type="entity-link">ConnectionNotFoundError</a>
                            </li>
                            <li class="link">
                                <a href="classes/HealthIndicator.html" data-type="entity-link">HealthIndicator</a>
                            </li>
                            <li class="link">
                                <a href="classes/StorageExceededError.html" data-type="entity-link">StorageExceededError</a>
                            </li>
                            <li class="link">
                                <a href="classes/TimeoutError.html" data-type="entity-link">TimeoutError</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnhealthyResponseCodeError.html" data-type="entity-link">UnhealthyResponseCodeError</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DiskHealthIndicator.html" data-type="entity-link">DiskHealthIndicator</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DNSHealthIndicator.html" data-type="entity-link">DNSHealthIndicator</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GRPCHealthIndicator.html" data-type="entity-link">GRPCHealthIndicator</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MemoryHealthIndicator.html" data-type="entity-link">MemoryHealthIndicator</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MicroserviceHealthIndicator.html" data-type="entity-link">MicroserviceHealthIndicator</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MongooseHealthIndicator.html" data-type="entity-link">MongooseHealthIndicator</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TerminusBootstrapService.html" data-type="entity-link">TerminusBootstrapService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TypeOrmHealthIndicator.html" data-type="entity-link">TypeOrmHealthIndicator</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DatabasePingCheckSettings.html" data-type="entity-link">DatabasePingCheckSettings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GRPCHealthService.html" data-type="entity-link">GRPCHealthService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MongoosePingCheckSettings.html" data-type="entity-link">MongoosePingCheckSettings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TerminusEndpoint.html" data-type="entity-link">TerminusEndpoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TerminusModuleAsyncOptions.html" data-type="entity-link">TerminusModuleAsyncOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TerminusModuleOptions.html" data-type="entity-link">TerminusModuleOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TerminusOptionsFactory.html" data-type="entity-link">TerminusOptionsFactory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TypeOrmPingCheckSettings.html" data-type="entity-link">TypeOrmPingCheckSettings</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});