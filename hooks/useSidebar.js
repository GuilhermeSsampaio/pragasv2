import { useState, useEffect } from 'react';
//hook que gerencia o estado da barra lateral
export const useSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState(['summary']);
  const [showSummary, setShowSummary] = useState(true);

  const toggleItem = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter((id) => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleToggleBackDrop = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const toggleSummaryAndMainMenu = () => {
    setShowSummary(!showSummary);
  };

  const handleTitleClick = (titleId) => {
    setActiveTitle(titleId);
    localStorage.setItem('activeChapter', titleId.toString()); // Armazena o ID no localStorage
};    

  useEffect(() => {
    const backButton = document.getElementById('back-button');
    if (backButton) {
      backButton.addEventListener('click', toggleSummaryAndMainMenu);
    }
    return () => {
      if (backButton) {
        backButton.removeEventListener('click', toggleSummaryAndMainMenu);
      }
    };
  }, []);

  return {
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
  };
};
