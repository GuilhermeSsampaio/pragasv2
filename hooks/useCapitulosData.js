import { useState, useEffect } from 'react';
import FetchApiOffline from '../localDatabase/FetchApiOffline.jsx';

//hook que carrega os capítulos da cartilha
export const useCapitulosData = (asPath, setActiveTitle) => {
  const [data, setData] = useState([]);
  const [clickedSectionId, setClickedSectionId] = useState(null);

  const loadContent = (index, chapterIndex) => {
    if (
      data[chapterIndex] &&
      data[chapterIndex].attributes &&
      data[chapterIndex].attributes.conteudo &&
      data[chapterIndex].attributes.conteudo[index]
    ) {
      setClickedSectionId(0);
      const content = data[chapterIndex].attributes.conteudo[index];
      setClickedSectionId(content.id);
    } else {
      console.warn('Invalid chapterIndex or index for loadContent');
    }
  };

  const CarregaCapitulos = async () => {
    try {
      const res = await FetchApiOffline(
        "https://api-cartilha-teste.onrender.com/api/pragas?populate=*",
        "api-manual",
        "pragas",
        "id",
        true
      );
      setData(res);
      if (asPath.includes('#capitulo_')) {
        const chapterNumber = extractChapterNumberFromAnchor(asPath);
        setActiveTitle(chapterNumber);
      } else if (res.length > 0) {
        setActiveTitle(res[0].id);
      } else {
        throw new Error('Falha na requisição.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    CarregaCapitulos();
  }, [asPath]);

  const extractChapterNumberFromAnchor = (path) => {
    const match = path.match(/#capitulo_(\d+)/);
    return match ? parseInt(match[1]) : null;
  };

  return { data, clickedSectionId, loadContent };
};
