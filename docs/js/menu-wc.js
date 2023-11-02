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
                    <a href="index.html" data-type="index-link">medxpress-client documentation</a>
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
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-42aee32bc789bcf5c9eaf79d4340da561ad4efb1bc25804f3ec66a4ffa94669c70403913ad59c77e321aeb3b3903e031c9b8611b1c8d45d5980ea1536be4f750"' : 'data-bs-target="#xs-components-links-module-AppModule-42aee32bc789bcf5c9eaf79d4340da561ad4efb1bc25804f3ec66a4ffa94669c70403913ad59c77e321aeb3b3903e031c9b8611b1c8d45d5980ea1536be4f750"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-42aee32bc789bcf5c9eaf79d4340da561ad4efb1bc25804f3ec66a4ffa94669c70403913ad59c77e321aeb3b3903e031c9b8611b1c8d45d5980ea1536be4f750"' :
                                            'id="xs-components-links-module-AppModule-42aee32bc789bcf5c9eaf79d4340da561ad4efb1bc25804f3ec66a4ffa94669c70403913ad59c77e321aeb3b3903e031c9b8611b1c8d45d5980ea1536be4f750"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CartModule.html" data-type="entity-link" >CartModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CartModule-357dc3779310eeefa03d2e264c9954264de681784e10369b9497519d5bdc48b3600eddd717f5f8664c7e4d48cf730235254adc2fc3ca7d6bc2fcb49bad1e6600"' : 'data-bs-target="#xs-components-links-module-CartModule-357dc3779310eeefa03d2e264c9954264de681784e10369b9497519d5bdc48b3600eddd717f5f8664c7e4d48cf730235254adc2fc3ca7d6bc2fcb49bad1e6600"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CartModule-357dc3779310eeefa03d2e264c9954264de681784e10369b9497519d5bdc48b3600eddd717f5f8664c7e4d48cf730235254adc2fc3ca7d6bc2fcb49bad1e6600"' :
                                            'id="xs-components-links-module-CartModule-357dc3779310eeefa03d2e264c9954264de681784e10369b9497519d5bdc48b3600eddd717f5f8664c7e4d48cf730235254adc2fc3ca7d6bc2fcb49bad1e6600"' }>
                                            <li class="link">
                                                <a href="components/CartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SuccessComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SuccessComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CartRoutingModule.html" data-type="entity-link" >CartRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CustomerModule.html" data-type="entity-link" >CustomerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CustomerModule-ef55a8eb721532734617e74bd087c6cc125d5a352463619e9f7025520ecb1397b4a82740522410cfdb603e08d62fe044eab7b6619c9820558f74c99508a16f57"' : 'data-bs-target="#xs-components-links-module-CustomerModule-ef55a8eb721532734617e74bd087c6cc125d5a352463619e9f7025520ecb1397b4a82740522410cfdb603e08d62fe044eab7b6619c9820558f74c99508a16f57"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CustomerModule-ef55a8eb721532734617e74bd087c6cc125d5a352463619e9f7025520ecb1397b4a82740522410cfdb603e08d62fe044eab7b6619c9820558f74c99508a16f57"' :
                                            'id="xs-components-links-module-CustomerModule-ef55a8eb721532734617e74bd087c6cc125d5a352463619e9f7025520ecb1397b4a82740522410cfdb603e08d62fe044eab7b6619c9820558f74c99508a16f57"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectionScreenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectionScreenComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CustomerRoutingModule.html" data-type="entity-link" >CustomerRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomeModule-1936e10aec47e7a4b47256c1527297c8fa01af3fbe0ec6cc84219e9a6d0e8ae7e21f3092c588deb421550b40cbab4ad16eb2f748bd9c7d16b08f974eb6d0e8fa"' : 'data-bs-target="#xs-components-links-module-HomeModule-1936e10aec47e7a4b47256c1527297c8fa01af3fbe0ec6cc84219e9a6d0e8ae7e21f3092c588deb421550b40cbab4ad16eb2f748bd9c7d16b08f974eb6d0e8fa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-1936e10aec47e7a4b47256c1527297c8fa01af3fbe0ec6cc84219e9a6d0e8ae7e21f3092c588deb421550b40cbab4ad16eb2f748bd9c7d16b08f974eb6d0e8fa"' :
                                            'id="xs-components-links-module-HomeModule-1936e10aec47e7a4b47256c1527297c8fa01af3fbe0ec6cc84219e9a6d0e8ae7e21f3092c588deb421550b40cbab4ad16eb2f748bd9c7d16b08f974eb6d0e8fa"' }>
                                            <li class="link">
                                                <a href="components/CategoryListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryProductGridComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryProductGridComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductsByCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsByCategoryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProductsModule-a3f2400c6d959ebd76732558769b0e361be9526c07157ba8cf91919f82da4193142cf21da0ec266bff5570a217303d9eb77084089564bce72c3ca9de8b8e59c5"' : 'data-bs-target="#xs-components-links-module-ProductsModule-a3f2400c6d959ebd76732558769b0e361be9526c07157ba8cf91919f82da4193142cf21da0ec266bff5570a217303d9eb77084089564bce72c3ca9de8b8e59c5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProductsModule-a3f2400c6d959ebd76732558769b0e361be9526c07157ba8cf91919f82da4193142cf21da0ec266bff5570a217303d9eb77084089564bce72c3ca9de8b8e59c5"' :
                                            'id="xs-components-links-module-ProductsModule-a3f2400c6d959ebd76732558769b0e361be9526c07157ba8cf91919f82da4193142cf21da0ec266bff5570a217303d9eb77084089564bce72c3ca9de8b8e59c5"' }>
                                            <li class="link">
                                                <a href="components/ProductDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductDetailsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsRoutingModule.html" data-type="entity-link" >ProductsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SearchModule.html" data-type="entity-link" >SearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SearchModule-2411e7c5bf67e9c9e4c27589b9d6c4f65b5852ab1d1356e173442250a18ca48f29076a56c3fae13a217a2e8726a260b6e5d235b4f50d66556d265bd6cdc7aa14"' : 'data-bs-target="#xs-components-links-module-SearchModule-2411e7c5bf67e9c9e4c27589b9d6c4f65b5852ab1d1356e173442250a18ca48f29076a56c3fae13a217a2e8726a260b6e5d235b4f50d66556d265bd6cdc7aa14"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchModule-2411e7c5bf67e9c9e4c27589b9d6c4f65b5852ab1d1356e173442250a18ca48f29076a56c3fae13a217a2e8726a260b6e5d235b4f50d66556d265bd6cdc7aa14"' :
                                            'id="xs-components-links-module-SearchModule-2411e7c5bf67e9c9e4c27589b9d6c4f65b5852ab1d1356e173442250a18ca48f29076a56c3fae13a217a2e8726a260b6e5d235b4f50d66556d265bd6cdc7aa14"' }>
                                            <li class="link">
                                                <a href="components/SearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchRoutingModule.html" data-type="entity-link" >SearchRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-ee77191d27c3965093ab7aa73edd18de10a2282e3a238783ea4915fe185884744fcd4ebc635413e8106d2edfc8dcb3a3e41767f804b56ebba07a9e1d91abf8f6"' : 'data-bs-target="#xs-components-links-module-SharedModule-ee77191d27c3965093ab7aa73edd18de10a2282e3a238783ea4915fe185884744fcd4ebc635413e8106d2edfc8dcb3a3e41767f804b56ebba07a9e1d91abf8f6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-ee77191d27c3965093ab7aa73edd18de10a2282e3a238783ea4915fe185884744fcd4ebc635413e8106d2edfc8dcb3a3e41767f804b56ebba07a9e1d91abf8f6"' :
                                            'id="xs-components-links-module-SharedModule-ee77191d27c3965093ab7aa73edd18de10a2282e3a238783ea4915fe185884744fcd4ebc635413e8106d2edfc8dcb3a3e41767f804b56ebba07a9e1d91abf8f6"' }>
                                            <li class="link">
                                                <a href="components/AddToCartModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddToCartModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BottomMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BottomMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WelcomeScreenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WelcomeScreenComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-SharedModule-ee77191d27c3965093ab7aa73edd18de10a2282e3a238783ea4915fe185884744fcd4ebc635413e8106d2edfc8dcb3a3e41767f804b56ebba07a9e1d91abf8f6"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-ee77191d27c3965093ab7aa73edd18de10a2282e3a238783ea4915fe185884744fcd4ebc635413e8106d2edfc8dcb3a3e41767f804b56ebba07a9e1d91abf8f6"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-ee77191d27c3965093ab7aa73edd18de10a2282e3a238783ea4915fe185884744fcd4ebc635413e8106d2edfc8dcb3a3e41767f804b56ebba07a9e1d91abf8f6"' :
                                            'id="xs-pipes-links-module-SharedModule-ee77191d27c3965093ab7aa73edd18de10a2282e3a238783ea4915fe185884744fcd4ebc635413e8106d2edfc8dcb3a3e41767f804b56ebba07a9e1d91abf8f6"' }>
                                            <li class="link">
                                                <a href="pipes/TakaCurrencyPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TakaCurrencyPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CartService.html" data-type="entity-link" >CartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomerServicesService.html" data-type="entity-link" >CustomerServicesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HomeService.html" data-type="entity-link" >HomeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PreviousUrlService.html" data-type="entity-link" >PreviousUrlService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link" >ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link" >TokenService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CartItem.html" data-type="entity-link" >CartItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerLogin.html" data-type="entity-link" >CustomerLogin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerRegister.html" data-type="entity-link" >CustomerRegister</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Orders.html" data-type="entity-link" >Orders</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link" >Product</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});