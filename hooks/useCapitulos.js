import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSidebar } from './useSidebar';

export const useCapitulos = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { query, asPath } = router;

  const [activeTitle, setActiveTitle] = useState(null);
  const [results, setResults] = useState([]);
  const [clickedSectionId, setClickedSectionId] = useState(null);
  const [activeSubchapter, setActiveSubchapter] = useState(null);

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

  const handleCloseResults = () => {
    setResults([]); // Limpa os resultados
  };

  const loadContent = (index, chapterIndex) => {
    setClickedSectionId(0);
    const content = data[chapterIndex].attributes.conteudo[index];
    setClickedSectionId(content.id);
  };

  const handleTitleClick = (titleId) => {
    console.log("handleTitleClick");
    setActiveTitle(titleId);
    localStorage.setItem("activeChapter", titleId.toString()); // Armazena o ID no localStorage
  };

  const handleSubchapterClick = (e, chapterId, subchapterId) => {
    e.preventDefault();
    setActiveSubchapter(subchapterId);
    localStorage
    if (!expandedItems.includes(chapterId)) {
      toggleItem(chapterId);
    }
    handleTitleClick(chapterId);
    handleSubitemContent(e, subchapterId);
    scrollToTop();
    const href = `/sumario?activeChapter=${chapterId}#capitulo_${subchapterId}`;
    router.push(href, undefined, { shallow: true });
  };

  const handleChapterClick = (itemId) => {
    console.log("handleChapterClick");
    setActiveTitle(itemId);
    toggleItem(itemId);
    scrollToTop();
    router.push(`/sumario?activeChapter=${itemId}`, undefined, { shallow: true });
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

  useEffect(() => {
    CarregaCapitulos();
  }, []);

  useEffect(() => {
    const queryChapterId = query.activeChapter ? parseInt(query.activeChapter, 10) : null;
    if (queryChapterId !== null) {
      setActiveTitle(queryChapterId);
    }
  }, [query]);

  const CarregaCapitulos = async () => {
    const url = 'https://api-cartilha-teste.onrender.com/api/pragas?populate=*';

    try {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        const data = json.data;
        setData(data);

        const queryChapterId = query.activeChapter ? parseInt(query.activeChapter, 10) : null;
        if (queryChapterId !== null) {
          setActiveTitle(queryChapterId);
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

  const closeSidebar = () => {
    const sidebarMenu = document.getElementById("sidebarMenu");
    if (sidebarMenu) {
      sidebarMenu.classList.remove("show");
      console.log("chamou closeSidebar");
    }
    setIsOffcanvasOpen(false);
  };

  const activeChapter = data.find(item => item.id === activeTitle);
  const displayedTitle = activeChapter ? activeChapter.attributes.title : 'Título do Capítulo';

  const handleToggleMainNavbar = () => {
    const mainNavbarOptionsMenu = document.getElementById('main-navbar-options-menu');
    const summary = document.getElementById('summary');

    if (mainNavbarOptionsMenu && summary) {
        mainNavbarOptionsMenu.style.display = 'block';
        summary.style.display = 'none';
    }
};
  return {
    data,
    CarregaCapitulos,
    activeTitle,
    setActiveTitle,
    results,
    clickedSectionId,
    handleCloseResults,
    loadContent,
    handleTitleClick,
    handleSubchapterClick,
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
    activeSubchapter,
    toggleSummaryAndMainMenu,
    handleToggleBackDrop,
    displayedTitle,
    handleToggleMainNavbar,
    isCollapsed
  };
};
