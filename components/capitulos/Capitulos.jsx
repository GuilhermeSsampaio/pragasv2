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
import CapitulosSidebar from './SidebarCapitulos.jsx';
import Navbar from '../navbar/Navbar.jsx';

//componente principal de capítulos que renderiza a barra lateral e o conteúdo do capítulo

export const Capitulos = () => {
  var LogoIF = require("../../public/ifms-dr-marca-2015.png");
  var LogoEmbrapa = require("../../public/logo-embrapa-400.png");
  var LogoIFEmbrapa = require("../../public/logo-if-embrapa.png");
  const [data, setData] = useState([]);
  const router = useRouter();
  const { query } = router;
  const { asPath } = router;

  const [activeTitle, setActiveTitle] = useState(null);
  const [results, setResults] = useState([]);
  const handleCloseResults = () => {
    setResults([]); // Limpa os resultados
};
const [clickedSectionId, setClickedSectionId] = useState(null);

const loadContent = (index, chapterIndex) => {
  setClickedSectionId(0);
  const content = data[chapterIndex].attributes.conteudo[index];
  setClickedSectionId(content.id);
};

  // const { clickedSectionId, loadContent } = useCapitulosData(asPath, setActiveTitle);
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
    // urlRouter(chapterId, subchapterId);
    scrollToTop();
    router.push(`/sumario?activeChapter=${chapterId}&activeSubChapter=${subchapterId}`, undefined, { shallow: true });

  };

  const urlRouter = (chapterId, subchapterId) => {
    if (activeTitle === null && data.length > 0) {
      setActiveTitle(data[0].id);
      router.push(`/sumario?activeChapter=${chapterId}&activeSubChapter=${subchapterId}`, undefined, { shallow: true });
    }
  };

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
  // router.push(`/sumario?activeChapter=${itemId}`);

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


// useEffect(() => {
//   if (activeTitle === null) {
//       // Verifique se data não é nulo e se tem pelo menos um elemento
//       if (data && data.length > 0) {
//         // Se for nulo, defina-o como o primeiro capítulo da API
//         setActiveTitle(data[0].id);
  
//         // Use useRouter para navegar para o capítulo ativo
//         router.push(`/sumario?activeChapter=${data[0].id}`, undefined, { shallow: true });
//       }
//     }
//   scrollToTop();
// }, [activeTitle, data, router]);


useEffect(() => {
  // Carrega os capítulos ao montar o componente
  CarregaCapitulos();
}, []);

useEffect(() => {
  const chapterNumber = extractChapterNumberFromAnchor(asPath);
  if (chapterNumber !== null) {
      setActiveTitle(chapterNumber);
  }
}, [asPath]);

const extractChapterNumberFromAnchor = (path) => {
  const match = path.match(/#capitulo_(\d+)/);
  return match ? parseInt(match[1]) : null;
};

const CarregaCapitulos = async () => {
  const url = 'https://api-cartilha-teste.onrender.com/api/pragas?populate=*';

  try {
      const response = await fetch(url);
      if (response.ok) {
          const json = await response.json();
          const data = json.data;
          setData(data);
          
          if (asPath.includes('#capitulo_')) {
              const chapterNumber = extractChapterNumberFromAnchor(asPath);
              setActiveTitle(chapterNumber);
          } else if (data.length > 0) {
              setActiveTitle(data[0].id);
          }
      } else {
          throw new Error('Falha na requisição. Código de status: ' + response.status);
      }
  } catch (error) {
      console.error(error);
  }
};


  return (
    <>
      <Head>
        <meta name="referrer" referrerPolicy="no-referrer" />
        <title>TecnofamApp</title>
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
        activeSubchapter={activeSubchapter}
        handleChapterClick={handleChapterClick}
        handleTitleClick={handleTitleClick}
        handleSubchapterClick={handleSubchapterClick}
        // activeTitle={activeTitle}
        toggleItem={toggleItem}
        toggleSummaryAndMainMenu={toggleSummaryAndMainMenu}
      />

        {/* Código Navbar  esta aqui pq se tirar buga -- corrigir*/} 
        <Navbar 
          isOffcanvasOpen={isOffcanvasOpen}
          handleToggleBackDrop={handleToggleBackDrop}
          
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
                <TextCapitulos lista={data} activeTitle={activeTitle} setActiveTitle={setActiveTitle} contentId={clickedSectionId} />

                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

    </>
  );
};