import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CapitulosSidebar({
  data,
  isOffcanvasOpen,
  setIsOffcanvasOpen,
  closeSidebar,
  showSummary,
  setShowSummary,
  expandedItems,
  setExpandedItems, // added to allow updating expandedItems from parent
  activeSubchapter,
  handleChapterClick,
  handleTitleClick,
  handleSubchapterClick,
}) {
  var LogoIF = require("../../public/ifms-dr-marca-2015.png");
  var LogoEmbrapa = require("../../public/logo-embrapa-400.png");
  var LogoIFEmbrapa = require("../../public/logo-if-embrapa.png");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleBackDrop = () => {
    console.log("handleToggleBackDrop");
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const handleToggleMainNavbar = () => {
    console.log("handleToggleMainNavbar");
    const mainNavbarOptionsMenu = document.getElementById(
      "main-navbar-options-menu"
    );
    const summary = document.getElementById("summary");

    if (mainNavbarOptionsMenu && summary) {
      mainNavbarOptionsMenu.style.display = "block";
      summary.style.display = "none";
    }
  };

  const toggleSummaryAndMainMenu = () => {
    setShowSummary(!showSummary);
  };

  const toggleItem = (item) => {
    if (expandedItems.includes(item)) {
      setExpandedItems(expandedItems.filter((i) => i !== item));
    } else {
      const isSummary = item === "summary";

      setExpandedItems(
        isSummary ? [item, ...expandedItems] : ["summary", item]
      );
    }
  };

  useEffect(() => {
    const anchorElement = document.getElementById("collapseExample1");

    if (anchorElement) {
      if (isCollapsed) {
        anchorElement.classList.add("collapse");
      } else {
        anchorElement.classList.remove("collapse");
      }
    }

    const backButton = document.getElementById("back-button");
    backButton.addEventListener("click", handleToggleMainNavbar);

    return () => {
      backButton.removeEventListener("click", handleToggleMainNavbar);
    };
  }, [isCollapsed]);

  return (
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
          <button
            type="button"
            className="clean-btn navbar-sidebar__back"
            id="back-button"
            onClick={() => {
              setShowSummary(false);
            }}
          >
            ← Voltar para o menu principal
          </button>
          {data.length > 0 ? (
            <div>
              <a
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center dropdown-background"
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
                      onClick={() => toggleItem(item.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0">{item.attributes.title}</h6>
                          {item.attributes.subtitle && (
                            <span className="subtitle font-size-lg">
                              {item.attributes.subtitle}
                            </span>
                          )}
                        </div>
                        <i
                          className={`fas fa-chevron-${
                            expandedItems.includes(item.id) ? "down" : "right"
                          } ml-2`}
                          style={{ fontSize: "15px" }}
                        ></i>
                      </div>
                    </a>

                    {expandedItems.includes(item.id) && (
                      <ul className="list-group list-group-flush mx-2 py-1">
                        {item.attributes.conteudo.map((conteudoItem, index) => (
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
                              {conteudoItem.titulo_subcap}
                            </a>
                          </li>
                        ))}
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
  );
}
