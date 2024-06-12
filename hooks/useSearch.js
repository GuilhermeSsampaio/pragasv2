import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useSearch = (data) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    if (searchTerm === '') {
      setSearchResults([]);
    } else {
      const results = [];
      data.forEach(chapter => {
        chapter.attributes.conteudo.forEach(subchapter => {
          if (subchapter.titulo_secao.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push({
              chapterId: chapter.id,
              subchapterId: subchapter.id,
              titulo_secao: subchapter.titulo_secao
            });
          }
        });
      });
      setSearchResults(results);
    }
  }, [searchTerm, data]);

  const handleResultClick = (chapterId, subchapterId) => {
    const href = `/sumario?activeChapter=${chapterId}&activeSubChapter=${subchapterId}`;
    const as = `/sumario?activeChapter=${chapterId}#capitulo_${subchapterId}`;
    router.push(href, as, { shallow: true });
  
    setSearchTerm('');
    setSearchResults([]);
  };
  
  
  return {
    searchTerm,
    searchResults,
    handleSearchChange,
    handleResultClick
  };
};
