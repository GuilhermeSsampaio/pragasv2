import { useState, useEffect, useRef } from "react";
import TableOfContents from "./TableOfContents";
import { convertToHTML } from "../utils/HtmlConverter";
import ChapterContent from "./ChapterContent";
import Navbar from "../navbar/Navbar";
import { useCapitulos } from "../../hooks/useCapitulos";
//componente responsável por montar a estrutura dos capítulos e a navegação entre eles
const TextCapitulos = ({
  lista,
  activeTitle,
  setActiveTitle,
  contentId,
  setContentId,
}) => {
  console.log(lista);
  const [headerBlocks, setHeaderBlocks] = useState([]);

  useEffect(() => {
    const extractedHeaderBlocks = [];

    lista.forEach((cap) => {
      const blocks = cap.attributes.conteudo
        .map((item) => {
          if (item.texto_conteudo) {
            try {
              return JSON.parse(item.texto_conteudo).blocks;
            } catch (e) {
              console.error("Erro ao fazer parse do JSON:", e);
              return [];
            }
          }
          return [];
        })
        .flat();
      blocks.forEach((block) => {
        if (block.type === "header") {
          extractedHeaderBlocks.push(block);
        }
      });
    });

    setHeaderBlocks(extractedHeaderBlocks);
  }, [lista]);

  const handleResultClick = (cap, item) => {
    setActiveTitle(cap.id);
    setContentId(item.id);
  };
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
      behavior: "smooth", // Adicionando um efeito de rolagem suave
    });
  };

  return (
    <>
      {/* <Navbar handleResultClick={handleResultClick} lista={lista}/>  */}
      {
        //dentro desse navbar ai quando manda a lista buga o sidebar, os cap clicados não fecham o sidebar
        // se remove o parametro da lista, a pesquisa para de funcionar mas o sidebar volta ao normal
        //ps: corrigi mas vou deixar pra lembrar
      }
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
        {/* <div className="table-of-contents">
          <TableOfContents
            key={activeTitle}
            headerBlocks={headerBlocks}
            activeTitle={activeTitle}
          />
        </div> */}
      </div>
      <nav
        className="pagination-nav docusaurus-mt-lg"
        aria-label="Páginas de documentação"
        style={{ zIndex: 99999 }}
      >
        {/* {prevChapter && (
          <button
            className="pagination-nav__link pagination-nav__link--prev"
            onClick={() => handleNavigation(prevChapter.id)}
          >
            <div className="pagination-nav__sublabel">Anterior</div>
            <div className="pagination-nav__label">
              {prevChapter.attributes.title}
            </div>
          </button>
        )} */}
        {/* {nextChapter && (
          <button
            className="pagination-nav__link pagination-nav__link--next"
            onClick={() => handleNavigation(nextChapter.id)}
          >
            <div className="pagination-nav__sublabel">Próxima</div>
            <div className="pagination-nav__label">
              {nextChapter.attributes.title}
            </div>
          </button>
        )} */}
      </nav>
    </>
  );
};

export default TextCapitulos;
