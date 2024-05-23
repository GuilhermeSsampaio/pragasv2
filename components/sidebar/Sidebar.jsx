import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SumarioDropdown from '../capitulos/SumarioDropDown';
const Sidebar = ({ data, isOffcanvasOpen, closeSidebar, setShowSummary, showSummary, expandedItems, toggleItem, activeTitle, setActiveTitle, handleSubitemContent, scrollToTop, toggleSummaryAndMainMenu }) => {
  var LogoIFEmbrapa = require('../../public/logo-if-embrapa.png');

    return (
        <nav id="sidebarMenu" className={`collapse d-lg-block sidebar bg-white thin-scrollbar ${isOffcanvasOpen ? 'show' : ''}`} tabIndex="-1">
            <div className="position-sticky">
                <div id="summary" className="list-group list-group-flush mt-2 py-2 menu_SIkG" style={{ display: showSummary ? 'block' : 'none' }}>
                    {/* Logo IF / Embrapa Dentro do Menu */}
                    <div className='logo-container-fixed'>
                        <div className="logo-container d-flex align-items-center justify-content-between">
                            <Link href="/home">
                                <Image className="img-sidebar-top mx-3" src={LogoIFEmbrapa} alt="logo Embrapa com letras em azul com um símbolo verde, sendo que as letras em cima do símbolo são brancas" width="45%" height={46} priority/>
                            </Link>
                            <button id="btn-close-sidebar" type="button" className="btn-close btn-close-dark btn-close-cap" data-bs-dismiss="collapse" aria-label="Close" onClick={() => { closeSidebar(); setShowSummary(true); }}></button>
                        </div>
                    </div>
                    <hr className="featurette-divider line-menu"></hr>
                    {/* Botão para Retornar as Opções "Edição Completa e Autores" | Opção Disponível quando a Tela é Menor que 992px */}
                    <button type="button" className="clean-btn navbar-sidebar__back" id="back-button" onClick={() => setShowSummary(true)}>← Voltar para o menu principal</button>
                    {/* Dropdown do Sumário */}
                    {data.length > 0 ? (
                        <div>
                            <a
                            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ripple`}
                            aria-current="true"
                            onClick={() => toggleItem('summary')}
                            >
                            <span className="w-100 text-primary">Sumário</span>
                            <i className={`fas fa-chevron-${expandedItems.includes('summary') ? 'down' : 'right'} icon-deg`}></i>
                            </a>
                            <SumarioDropdown
                                data={data}
                                expandedItems={expandedItems}
                                toggleItem={toggleItem}
                                activeTitle={activeTitle}
                                setActiveTitle={setActiveTitle}
                                // handleTitleClick={handleTitleClick}
                                handleSubitemContent={(e, sectionId, chapterIndex) => handleSubitemContent(e, sectionId, chapterIndex)}
                                scrollToTop={scrollToTop}
                            />

                        </div>
                        ) : (
                        <p className='d-flex justify-content-center' style={{ marginTop: 20 }}>Carregando dados...</p>
                        )}
                </div>
            </div>
            {/* Opções Retornadas quando o Usuário Aperta no Botão "← Voltar para o menu principal" */}
            <div id='main-navbar-options-menu' style={{ marginTop: 16, display: showSummary ? 'none' : 'block' }}>
                <div className="logo-container d-flex align-items-center justify-content-between">
                    <Link href="/home">
                        <Image className="img-sidebar-top mx-3" src={LogoIFEmbrapa} alt="logo Embrapa com letras em azul com um símbolo verde, sendo que as letras em cima do símbolo são brancas" width="45%" height={46} priority/>
                    </Link>
                    <button id="btn-close-sidebar" type="button" className="btn-close btn-close-dark btn-close-cap" data-bs-dismiss="sidebar" aria-label="Close" onClick={closeSidebar}></button>
                </div>
                <hr className="featurette-divider line-menu"></hr>
                <button type="button" className="clean-btn navbar-sidebar__back" id="back-button" onClick={toggleSummaryAndMainMenu}>← Voltar para o Sumário</button>
                <ul className="navbar-nav ms-auto d-flex itens-menu-cap">
                    <li className="nav-item mx-3">
                        <Link className="nav-link back-item-link py-2" href="/sumario" aria-current="page">
                            <span className="link-text">Sumário</span>
                        </Link> 
                    </li>
                    <li className="nav-item mx-3">
                        <Link className="nav-link back-item-link py-2" href="/autores" aria-current="page">
                            <span className="link-text">Autores</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
