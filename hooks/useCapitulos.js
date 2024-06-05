import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSidebar } from './useSidebar';
export const useCapitulos = () => {

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
  return {
    data,
    activeTitle,
    setActiveTitle,
    results,
    clickedSectionId,
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
    activeSubchapter,
    toggleSummaryAndMainMenu,
    handleToggleBackDrop,
    displayedTitle,
  };
};
