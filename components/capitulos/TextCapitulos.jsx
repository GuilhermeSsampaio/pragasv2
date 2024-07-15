import { useState, useEffect, useRef } from 'react';
import TableOfContents from './TableOfContents';
import { convertToHTML } from '../utils/HtmlConverter'
import ChapterContent from './ChapterContent';
import Navbar from '../navbar/Navbar'
//componente responsável por montar a estrutura dos capítulos e a navegação entre eles
const TextCapitulos = ({ lista, activeTitle, setActiveTitle , contentId, setContentId}) => {
  
  const [headerBlocks, setHeaderBlocks] = useState([]);

  useEffect(() => {
    const extractedHeaderBlocks = [];

    lista.forEach((cap) => {
      const blocks = cap.attributes.conteudo.map((item) => {
        return JSON.parse(item.texto_conteudo).blocks;
      }).flat();      
      blocks.forEach((block) => {
        if (block.type === 'header') {
          extractedHeaderBlocks.push(block);
        }
      });
    });

    setHeaderBlocks(extractedHeaderBlocks);
  }, [lista]);

  const handleResultClick = (cap, item) => {
    setActiveTitle(cap.id);
    setContentId(item.id);
  }
  const currentIndex = lista.findIndex((cap) => cap.id === activeTitle);
  const prevChapter = lista[currentIndex - 1];
  const nextChapter = lista[currentIndex + 1];

  const handleNavigation = (chapterId) => {
    setActiveTitle(chapterId);
    scrollToTop();
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Adicionando um efeito de rolagem suave
    });
  };

  return (
    <>
      <Navbar lista={lista} handleResultClick={handleResultClick}/>
      <div className="text-with-toc">
        <div className="text-content">
        {lista.map((cap) => (
          <ChapterContent 
            key={cap.id}
            cap={cap}
            activeTitle={activeTitle}
            convertToHTML={convertToHTML}
            contentId={contentId}
            
          />
        ))}
      </div>
        <div className="table-of-contents">
          <TableOfContents key={activeTitle} headerBlocks={headerBlocks} />
        </div>
      </div>
      <nav className="pagination-nav docusaurus-mt-lg" aria-label="Páginas de documentação" style={{ zIndex: 99999 }}>
        {prevChapter && (
          <button
            className="pagination-nav__link pagination-nav__link--prev"
            onClick={() => handleNavigation(prevChapter.id)}
          >
            <div className="pagination-nav__sublabel">Anterior</div>
            <div className="pagination-nav__label">{prevChapter.attributes.title}</div>
          </button>
        )}
        {nextChapter && (
          <button
            className="pagination-nav__link pagination-nav__link--next"
            onClick={() => handleNavigation(nextChapter.id)}
          >
            <div className="pagination-nav__sublabel">Próxima</div>
            <div className="pagination-nav__label">{nextChapter.attributes.title}</div>
          </button>
        )}
      </nav>
    </>
  );
};

export default TextCapitulos;