// utils.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export const Utils = () => {
    const router = useRouter();
    const { query, asPath } = router;

    const [results, setResults] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [data, setData] = useState([]);
    const [activeTitle, setActiveTitle] = useState(null);
    const [showSummary, setShowSummary] = useState(true);
    const [expandedItems, setExpandedItems] = useState(['summary']);
    const [clickedSectionId, setClickedSectionId] = useState(null);

    return {
        router,
        query,
        asPath,
        results,
        setResults,
        isCollapsed,
        setIsCollapsed,
        isOffcanvasOpen,
        setIsOffcanvasOpen,
        data,
        setData,
        activeTitle,
        setActiveTitle,
        showSummary,
        setShowSummary,
        expandedItems,
        setExpandedItems,
        clickedSectionId,
        setClickedSectionId,
    };
};

export const handleSubitemContent = (e, data, setClickedSectionId) => {
    e.preventDefault();
    let index = +e.target.dataset.conteudoIndex;
    let chapter = +e.target.dataset.chapterIndex;
    loadContent(index, chapter, data, setClickedSectionId);
};

export const loadContent = (index, chapterIndex, data, setClickedSectionId) => {
    setClickedSectionId(0);
    const content = data[chapterIndex].attributes.conteudo[index];
    setClickedSectionId(content.id);
    // console.log(`id clicado: ${content.id} titulo: ${content.titulo_secao}`);
};

export const toggleItem = (itemId, expandedItems, setExpandedItems) => {
    if (expandedItems.includes(itemId)) {
        setExpandedItems(expandedItems.filter((id) => id !== itemId));
    } else {
        setExpandedItems([...expandedItems, itemId]);
    }
};

export const handleTitleClick = (titleId, setActiveTitle) => {
    setActiveTitle(titleId);
    localStorage.setItem('activeChapter', titleId.toString()); // Armazena o ID no localStorage
};

export const openSidebar = (setIsOffcanvasOpen) => {
    setIsOffcanvasOpen(true);
};

export const handleToggle = (setIsCollapsed) => {
    setIsCollapsed((prevState) => !prevState);
};

export const handleToggleBackDrop = (setIsOffcanvasOpen) => {
    setIsOffcanvasOpen((prevState) => !prevState);
};

export const toggleSummaryAndMainMenu = (setShowSummary) => {
    setShowSummary((prevState) => !prevState);
};

export const handleCloseResults = (setResults) => {
    setResults([]); // Limpa os resultados
};

export const handleToggleMainNavbar = () => {
    const mainNavbarOptionsMenu = document.getElementById('main-navbar-options-menu');
    const summary = document.getElementById('summary');

    if (mainNavbarOptionsMenu && summary) {
        mainNavbarOptionsMenu.style.display = 'block';
        summary.style.display = 'none';
    }
};

export const closeSidebar = (setIsOffcanvasOpen) => {
    const sidebarMenu = document.getElementById("sidebarMenu");
    if (sidebarMenu) {
        sidebarMenu.classList.remove("show");
    }
    setIsOffcanvasOpen(false);
};
