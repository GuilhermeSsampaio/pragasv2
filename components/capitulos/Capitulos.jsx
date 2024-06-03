import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import TextCapitulos from './TextCapitulos.jsx';
import { useCapitulosData } from '../../hooks/useCapitulosData';
import { useSidebar } from '../../hooks/useSidebar';
import Sidebar from '../sidebar/Sidebar.jsx';
import Breadcrumbs from '../utils/Breadcrumbs.jsx';
import Image from 'next/image';
import Logo from '../../public/logo-cartilha.svg';
// import LogoIF from '../../public/logo-if.png';
// import LogoEmbrapa from '../../public/logo-embrapa.png';
import LogoIFEmbrapa from '../../public/logo-if-embrapa.png';
import Link from 'next/link.js';
import { SearchBar } from '../search/SearchBar';
import { SearchResultsList } from '../search/SearchResultsList';

//componente principal de capítulos que renderiza a barra lateral e o conteúdo do capítulo

export const Capitulos = () => {
  var LogoIF = require("../../public/ifms-dr-marca-2015.png");
  var LogoEmbrapa = require("../../public/logo-embrapa-400.png");
  var LogoIFEmbrapa = require("../../public/logo-if-embrapa.png");

  const router = useRouter();
  const { asPath } = router;
  const [activeTitle, setActiveTitle] = useState(null);
  const [results, setResults] = useState([]);
  const handleCloseResults = () => {
    setResults([]); // Limpa os resultados
};

  const { data, clickedSectionId, loadContent } = useCapitulosData(asPath, setActiveTitle);
  const {
    isCollapsed,
    isOffcanvasOpen,
    expandedItems,
    showSummary,
    toggleItem,
    handleToggle,
    handleToggleBackDrop,
    toggleSummaryAndMainMenu,
    setIsOffcanvasOpen,
    setShowSummary
  } = useSidebar();

  const [activeSubchapter, setActiveSubchapter] = useState(null);
  const handleTitleClick = (titleId) => {
    console.log("handleTitleClick");
    setActiveTitle(titleId);
    localStorage.setItem("activeChapter", titleId.toString()); // Armazena o ID no localStorage
  };
  const handleSubchapterClick = (e, chapterId, subchapterId) => {
    e.preventDefault();
    setActiveSubchapter(subchapterId);
    expandedItems.includes(chapterId) || toggleItem(chapterId);
    handleTitleClick(chapterId);
    handleSubitemContent(e, subchapterId);
    scrollToTop();
  };

  useEffect(() => {
    if (activeTitle === null && data.length > 0) {
      setActiveTitle(data[0].id);
      router.push(`/sumario?activeChapter=${data[0].id}`, undefined, { shallow: true });
    }
  }, [activeTitle, data, router]);

  const activeChapter = data.find(item => item.id === activeTitle);
  const displayedTitle = activeChapter ? activeChapter.attributes.title : 'Título do Capítulo';
//Função para quando o usuário quiser fechar o sidebar
const closeSidebar = () => {
  const sidebarMenu = document.getElementById("sidebarMenu");
  if (sidebarMenu) {
    sidebarMenu.classList.remove("show");
    console.log("chamou closeSidebar");
  }
  setIsOffcanvasOpen(false);
};
const handleChapterClick = (itemId) => {
  console.log("handleChapterClick");
  toggleItem(itemId);
  scrollToTop();
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Adicionando um efeito de rolagem suave
  });
};

const handleSubitemContent = (e) => {
  e.preventDefault();

  let index = +e.target.dataset.conteudoIndex;
  let chapter = +e.target.dataset.chapterIndex;
  loadContent(index, chapter);
};

// const loadContent = (index, chapterIndex) => {
//   // setActiveTitle(item.id);
//   // const targetId = `capitulo_${conteudoItem.id}`;
//   // const targetElement = document.getElementById(targetId);
//   // if (targetElement) {
//   //     targetElement.scrollIntoView({ behavior: 'smooth' });
//   // }
//   const content = data[chapterIndex].attributes.conteudo[index];
//   // console.log(content);
// };
  return (
    <>
      <Head>
        <meta name="referrer" referrerPolicy="no-referrer" />
        <title>TecnofamApp</title>
      </Head>

      <div className="container-wrapper">
        {/* <Sidebar
          data={data}
          isOffcanvasOpen={isOffcanvasOpen}
          closeSidebar={() => setIsOffcanvasOpen(false)}
          setIsOffcanvasOpen={setIsOffcanvasOpen}
          setShowSummary={setShowSummary}
          showSummary={showSummary}
          expandedItems={expandedItems}
          toggleItem={toggleItem}
          activeTitle={activeTitle}
          setActiveTitle={setActiveTitle}
          handleSubitemContent={(e) => {
            e.preventDefault();
            const index = +e.target.dataset.conteudoIndex;
            const chapter = +e.target.dataset.chapterIndex;
            loadContent(index, chapter);
          }}
          scrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          toggleSummaryAndMainMenu={toggleSummaryAndMainMenu}
        />

        <main className='docMainContainer_gTbr'>
          <div className='container padding-bottom--lg'>
            <div className='col'>
              <Breadcrumbs displayedTitle={displayedTitle} />
              <section className="home-section right-sidebar" style={{ marginTop: 30 }}>
                <div id="contents" className="bd-content ps-lg-2">
                  <TextCapitulos lista={data} activeTitle={activeTitle} setActiveTitle={setActiveTitle} contentId={clickedSectionId} />
                </div>
              </section>
            </div>
          </div>
        </main>
      </div> */}
      <nav
          id="sidebarMenu"
          className={`collapse d-lg-block sidebar bg-white thin-scrollbar ${
            isOffcanvasOpen ? "show" : ""
          }`}
          tabIndex="-1"
        >
          <div className="position-sticky">
            <div
              id="summary"
              className="list-group list-group-flush mt-2 py-2 menu_SIkG"
              style={{ display: showSummary ? "block" : "none" }}
            >
              {/* Logo IF / Embrapa Dentro do Menu */}
              <div className="logo-container-fixed">
                <div className="logo-container d-flex align-items-center justify-content-between">
                  <Link href="/home">
                    <Image
                      className="img-sidebar-top mx-3"
                      src={LogoIFEmbrapa}
                      alt="logo Embrapa com letras em azul com um símbolo verde, sendo que as letras em cima do símbolo são brancas"
                      width="45%"
                      height={46}
                      priority
                    />
                  </Link>
                  <button
                    id="btn-close-sidebar"
                    type="button"
                    className="btn-close btn-close-dark btn-close-cap"
                    data-bs-dismiss="collapse"
                    aria-label="Close"
                    onClick={() => {
                      closeSidebar();
                      setShowSummary(true);
                    }}
                  ></button>
                </div>
              </div>
              <hr className="featurette-divider line-menu"></hr>
              {/* Botão para Retornar as Opções "Edição Completa e Autores" | Opção Disponível quando a Tela é Menor que 992px */}
              <button
                type="button"
                className="clean-btn navbar-sidebar__back"
                id="back-button"
                onClick={() => setShowSummary(true)}
              >
                ← Voltar para o menu principal
              </button>
              {/* Dropdown do Sumário */}
              {data.length > 0 ? (
                <div>
                  <a
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ripple`}
                    aria-current="true"
                    onClick={() => toggleItem("summary")}
                  >
                    <span className="w-100 text-primary">Sumário</span>
                    <i
                      className={`fas fa-chevron-${
                        expandedItems.includes("summary") ? "down" : "right"
                      } icon-deg`}
                    ></i>
                  </a>
                  <div
                    id="summary-content"
                    className={`list-group list-group-flush mx-2 py-1 ${
                      expandedItems.includes("summary") ? "show" : "collapse"
                    }`}
                  >
                    {data.map((item, chapterIndex) => (
                      <div key={item.id}>
                        <a
                          className={`list-group-item list-group-item-action py-2 ${
                            expandedItems.includes(item.id) ? "active" : ""
                          }`}
                          onClick={() => handleChapterClick(item.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-0">{item.attributes.title}</h6>
                              {/* {item.attributes.subtitle && (
                                <span className="subtitle font-size-lg">
                                  {item.attributes.subtitle}
                                </span>
                              )} */}
                               {item.attributes.subtitle && (
                  <span className="subtitle font-size-lg">{item.attributes.subtitle}</span>
                )}
                            </div>
                            <i
                              className={`fas fa-chevron-${
                                expandedItems.includes(item.id)
                                  ? "down"
                                  : "right"
                              } ml-2`}
                              style={{ fontSize: "15px" }}
                            ></i>
                          </div>
                        </a>

                        {expandedItems.includes(item.id) && (
                          <ul className="list-group list-group-flush mx-2 py-1">
                            {item.attributes.conteudo.map(
                              (conteudoItem, index) => (
                                <li
                                  key={conteudoItem.id}
                                  className={`list-group-item py-2 ${
                                    activeSubchapter === conteudoItem.id
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    handleTitleClick(item.id);
                                    setIsOffcanvasOpen(false);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  <a
                                    data-conteudo-index={index}
                                    data-chapter-index={chapterIndex}
                                    href={`#capitulo_${conteudoItem.id}`}
                                    className={
                                      activeSubchapter === conteudoItem.id
                                        ? "active-link-summary"
                                        : ""
                                    }
                                    onClick={(e) =>
                                      handleSubchapterClick(
                                        e,
                                        item.id,
                                        conteudoItem.id
                                      )
                                    }
                                  >
                                    {conteudoItem.titulo_secao}
                                  </a>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p
                  className="d-flex justify-content-center"
                  style={{ marginTop: 20 }}
                >
                  Carregando dados...
                </p>
              )}
            </div>
          </div>
          {/* Opções Retornadas quando o Usuário Aperta no Botão "← Voltar para o menu principal" */}
          <div
            id="main-navbar-options-menu"
            style={{ marginTop: 16, display: showSummary ? "none" : "block" }}
          >
            <div className="logo-container d-flex align-items-center justify-content-between">
              <Link href="/home">
                <Image
                  className="img-sidebar-top mx-3"
                  src={LogoIFEmbrapa}
                  alt="logo Embrapa com letras em azul com um símbolo verde, sendo que as letras em cima do símbolo são brancas"
                  width="45%"
                  height={46}
                  priority
                />
              </Link>
              <button
                id="btn-close-sidebar"
                type="button"
                className="btn-close btn-close-dark btn-close-cap"
                data-bs-dismiss="sidebar"
                aria-label="Close"
                onClick={closeSidebar}
              ></button>
            </div>
            <hr className="featurette-divider line-menu"></hr>
            <button
              type="button"
              className="clean-btn navbar-sidebar__back"
              id="back-button"
              onClick={toggleSummaryAndMainMenu}
            >
              ← Voltar para o Sumário
            </button>
            <ul className="navbar-nav ms-auto d-flex itens-menu-cap">
              <li className="nav-item mx-3">
                <Link
                  className="nav-link back-item-link py-2"
                  href="/sumario"
                  aria-current="page"
                >
                  <span className="link-text">Sumário</span>
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className="nav-link back-item-link py-2"
                  href="/autores"
                  aria-current="page"
                >
                  <span className="link-text">Autores</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Código Navbar */}
        <nav
          id="main-navbar"
          className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle Offcanvas"
              onClick={handleToggleBackDrop}
            >
              <i className="fas fa-bars"></i>
            </button>
            {/* Logo Navbar */}
            <Link className="navbar-brand" href="/home">
              <Image
                src={Logo}
                width="100%"
                height={40}
                alt="logo Embrapa com letras em azul com um simbolo verde, sendo que as letras em cima do simbolo são brancas"
              />
            </Link>
            {/* Código dos Itens Exibidos no Navbar */}
            <ul className="navbar-nav ms-auto d-flex flex-row">
              <li className="nav-item text-item-link">
                <Link
                  className="nav-link back-item-link"
                  href="/sumario"
                  aria-current="page"
                >
                  <span className="link-text">Sumário</span>
                </Link>
              </li>
              <li className="nav-item text-item-link">
                <Link
                  className="nav-link back-item-link"
                  href="/autores"
                  aria-current="page"
                >
                  <span className="link-text">Autores</span>
                </Link>
              </li>
              {/* Input Search para tela maior que 992px */}
              <div className="hide-form-search2">
                <form
                  className="d-flex rounded-pill position-relative first-form-search"
                  role="search"
                >
                  <div className="search-bar-container p-1">
                    <SearchBar setResults={setResults} />
                    {results && results.length > 0 && (
                      <SearchResultsList
                        results={results}
                        handleCloseResults={handleCloseResults}
                      />
                    )}
                  </div>
                </form>
              </div>

              <li className="nav-item">
                <Image
                  src={LogoIF}
                  className="logotipo img"
                  width={130}
                  height={35}
                  alt="Logotipo do IFMS Campus Dourados"
                  priority
                />
              </li>
              <li className="nav-item me-lg-0">
                <Image
                  src={LogoEmbrapa}
                  className="logotipo img"
                  width={70}
                  height={48}
                  alt="Logotipo da Embrapa"
                  priority
                />
              </li>

              {/* Input Search para tela menor que 992px */}
              <form
                className="d-flex rounded-pill position-relative"
                role="search"
              >
                <div className="input-group hide-form-search">
                  <div className="search-bar-container">
                    <SearchBar setResults={setResults} />
                    {results && results.length > 0 && (
                      <SearchResultsList
                        results={results}
                        handleCloseResults={handleCloseResults}
                      />
                    )}
                  </div>
                </div>
              </form>
            </ul>
          </div>
          {isOffcanvasOpen && (
            <div
              className="offcanvas-backdrop show"
              onClick={handleToggleBackDrop}
            ></div>
          )}
        </nav>

        {/* Conteúdo do Manual */}
        <main className="docMainContainer_gTbr">
          <div className="container padding-bottom--lg">
            <div className="col">
              <nav
                className="home-section"
                aria-label="Breadcrumbs"
                style={{ marginTop: 120 }}
              >
                {/* Código Navegação Estrutural | Trilha de Navegção do Usuário */}
                <ul className="breadcrumbs">
                  <li className="breadcrumbs__item">
                    <Link href="/home" className="breadcrumbs__link">
                      <i
                        className="fas fa-home"
                        style={{ fontSize: "13px" }}
                      ></i>
                    </Link>
                    <i
                      className="fas fa-chevron-right"
                      style={{ fontSize: "10px" }}
                    ></i>
                  </li>
                  <li className="breadcrumbs__item">
                    <span className="breadcrumbs__link">Sumário</span>
                    <meta itemProp="position" content="1" />
                    <i
                      className="fas fa-chevron-right"
                      style={{ fontSize: "10px" }}
                    ></i>
                  </li>
                  <li className="breadcrumbs__item breadcrumbs__item--active">
                    <span className="breadcrumbs__link" itemProp="name">
                      {displayedTitle}
                    </span>
                    <meta itemProp="position" content="2" />
                  </li>
                </ul>
              </nav>
              <section
                className="home-section right-sidebar"
                style={{ marginTop: 30 }}
              >
                {/* Código dos Textos da Cartilha */}
                <div id="contents" className="bd-content ps-lg-2">
                <TextCapitulos lista={data} activeTitle={activeTitle} setActiveTitle={setActiveTitle} contentId={clickedSectionId} />

                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* Código Footer Embrapa */}
      <footer>
        <div className="container container-footer bottom-0 end-0">
          <div className="title-footer">
            <p>Embrapa Agropecuária Oeste</p>
          </div>
          <div className="description-footer">
            <p>
              Rodovia BR 163, Km 253,6, Caixa Postal 449, CEP: 79804-970,
              Dourados, MS
            </p>
            <p>Fone: + 55 (67) 3416-9700</p>
          </div>
        </div>
      </footer>
    </>
  );
};
