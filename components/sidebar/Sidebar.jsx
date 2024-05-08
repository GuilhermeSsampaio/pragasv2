import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = ({ data }) => {
    var LogoIF = require('../public/ifms-dr-marca-2015.png');
    var LogoEmbrapa = require('../public/logo-embrapa-400.png');
    var LogoIFEmbrapa = require('../public/logo-if-embrapa.png');
    const [isCollapsed, setIsCollapsed] = useState(false);
    // const [activeTitle, setActiveTitle] = useState(null);
    const [showSummary, setShowSummary] = useState(true);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleTitleClick = (id) => {
        setActiveTitle(5);
    };

    const closeSidebar = () => {
        setIsOffcanvasOpen(false);
    };

    const toggleSummaryAndMainMenu = () => {
        setShowSummary(!showSummary);
    };

    return (
        <nav id="sidebarMenu" className={`collapse d-lg-block sidebar bg-white thin-scrollbar ${isOffcanvasOpen ? 'show' : ''}`} tabIndex="-1">
            <div className="position-sticky">
                <div id="summary" className="list-group list-group-flush mt-2 py-2 menu_SIkG" style={{ display: showSummary ? 'block' : 'none' }}>
                    {/* Logo IF / Embrapa Dentro do Menu */}
                    <div className='logo-container-fixed'>
                        <div className="logo-container d-flex align-items-center justify-content-between">
                            <Link href="/home">
                                <Image className="img-sidebar-top mx-3" src={LogoIFEmbrapa} alt="logo Embrapa com letras em azul com um símbolo verde, sendo que as letras em cima do símbolo são brancas" width="45%" height={46} priority />
                            </Link>
                            <button id="btn-close-sidebar" type="button" className="btn-close btn-close-dark btn-close-cap" data-bs-dismiss="collapse" aria-label="Close" onClick={closeSidebar}></button>
                        </div>
                    </div>
                    <hr className="featurette-divider line-menu"></hr>
                    {/* Botão para Retornar as Opções "Edição Completa e Autores" | Opção Disponível quando a Tela é Menor que 992px */}
                    <button type="button" className="clean-btn navbar-sidebar__back" id="back-button" onClick={() => setShowSummary(true)}>← Voltar para o menu principal</button>
                    {/* Dropdown do Sumário */}
                    <div>
                        <a
                            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ripple ${isCollapsed ? 'collapsed' : ''}`}
                            aria-current="true"
                            onClick={handleToggle}
                        >
                            <span className="w-100 text-primary">Sumário</span>{' '}
                            <i className={`fas fa-chevron-${isCollapsed ? 'right' : 'down'} icon-deg`}></i>
                        </a>
                        {/* Conteúdo do Sidebar, dentro do Dropdown Sumário */}
                        {data.length > 0 ? (
                            data.map((item) => (
                                <ul key={item.id} id="collapseExample1"
                                    className={`list-group list-group-flush mx-2 py-1 ${isCollapsed ? 'collapse' : 'show'}`}
                                >
                                    <li className={`list-group-item py-2 ${activeTitle === item.id ? 'active' : ''}`}
                                        onClick={() => { handleTitleClick(item.id); setIsOffcanvasOpen(false); }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <a
                                            href={`#capitulo_${item.id}`}
                                            className={activeTitle === item.id ? 'active-link-summary' : ''}
                                        >
                                            {item.attributes.title}
                                        </a>
                                    </li>
                                </ul>
                            ))
                        ) : (
                            <p className='d-flex justify-content-center' style={{ marginTop: 20 }}>Carregando dados...</p>
                        )}
                    </div>
                </div>
            </div>
            {/* Opções Retornadas quando o Usuário Aperta no Botão "← Voltar para o menu principal" */}
            <div id='main-navbar-options-menu' style={{ marginTop: 16, display: showSummary ? 'none' : 'block' }}>
                <div className="logo-container d-flex align-items-center justify-content-between">
                    <Link href="/home">
                        <Image className="img-sidebar-top mx-3" src={LogoIFEmbrapa} alt="logo Embrapa com letras em azul com um símbolo verde, sendo que as letras em cima do símbolo são brancas" width="45%" height={46} priority />
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
