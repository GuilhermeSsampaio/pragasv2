import React, { useEffect, useState } from "react";
import Head from "next/head";
import TextCapitulos from "./TextCapitulos.jsx";
import Link from "next/link.js";
import CapitulosSidebar from "./SidebarCapitulos.jsx";
import Navbar from "../navbar/Navbar.jsx";
import { useCapitulos } from "../../hooks/useCapitulos";

//componente principal de capítulos que renderiza a barra lateral e o conteúdo do capítulo

export const Capitulos = () => {
  const {
    data,
    activeTitle,
    setActiveTitle,
    results,
    clickedSectionId,
    setClickedSectionId,
    handleCloseResults,
    loadContent,
    handleTitleClick,
    handleSubchapterClick,
    urlRouter,
    closeSidebar,
    handleChapterClick,
    scrollToTop,
    handleSubitemContent,
    isOffcanvasOpen,
    setIsOffcanvasOpen,
    showSummary,
    setShowSummary,
    toggleItem,
    expandedItems,
    setExpandedItems,
    activeSubchapter,
    toggleSummaryAndMainMenu,
    handleToggleBackDrop,
    displayedTitle,
    handleToggleMainNavbar,
  } = useCapitulos();
  const handleResultClick = (cap, item) => {
    setActiveTitle(cap.id);
    setClickedSectionId(item.id);
  };
  // console.log(data);
  return (
    <>
      <Head>
        <meta name="referrer" referrerPolicy="no-referrer" />
        <title>Manual de Identificação | Embrapa</title>
      </Head>

      <div className="container-wrapper">
        {/* Código Sidebar */}
        <CapitulosSidebar
          data={data}
          isOffcanvasOpen={isOffcanvasOpen}
          setIsOffcanvasOpen={setIsOffcanvasOpen}
          closeSidebar={closeSidebar}
          showSummary={showSummary}
          setShowSummary={setShowSummary}
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
          activeSubchapter={activeSubchapter}
          handleChapterClick={handleChapterClick}
          handleTitleClick={handleTitleClick}
          handleSubchapterClick={handleSubchapterClick}
          // activeTitle={activeTitle}
          toggleItem={toggleItem}
          toggleSummaryAndMainMenu={toggleSummaryAndMainMenu}
          handleToggleMainNavbar={handleToggleMainNavbar}
        />

        {/* Código Navbar  esta aqui pq se tirar buga -- corrigir*/}
        <Navbar
          isOffcanvasOpen={isOffcanvasOpen}
          handleToggleBackDrop={handleToggleBackDrop}
          handleResultClick={handleResultClick}
          lista={data}
        />
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
                  <TextCapitulos
                    lista={data}
                    activeTitle={activeTitle}
                    setActiveTitle={setActiveTitle}
                    contentId={clickedSectionId}
                    setContentId={setClickedSectionId}
                  />
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
