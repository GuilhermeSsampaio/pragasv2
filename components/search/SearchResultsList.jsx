import Link from 'next/link';
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, handleCloseResults }) => {
  const mappedResults = results.map(item => {
    // Verifica se item.attributes e item.attributes.conteudo existem
    const subchapterId = item.attributes && item.attributes.conteudo && item.attributes.conteudo.length > 0 ? item.attributes.conteudo[0].id : null;
    
    return {
      ...item,
      chapterId: item.id, // Supondo que o id seja equivalente ao chapterId
      subchapterId
    };
  });

  const handleResultClick = () => {
    handleCloseResults();
  };

  return (
    <div className="results-list" onClick={handleResultClick}>
      {mappedResults.map((result, id) => (
        <Link className='result-link' href={`/sumario?activeChapter=${result.chapterId}&activeSubChapter=${result.subchapterId}`} key={id} passHref>
          <SearchResult result={result} />
        </Link>
      ))}
    </div>
  );
};
