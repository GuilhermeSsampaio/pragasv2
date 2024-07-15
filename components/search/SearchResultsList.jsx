import React from 'react';
import Link from 'next/link';
import SearchResult from './SearchResult'; // Importar o componente de resultado

const SearchResultsList = ({ results, handleCloseResults }) => {
  const mappedResults = results.map(({ cap, item }) => ({
    ...item,
    chapterId: cap.id,
    chapterTitle: cap.attributes.title,
  }));

  const handleResultClick = () => {
    handleCloseResults();
  };

  return (
    <div className="results-list" onClick={handleResultClick}>
      {mappedResults.map((result, index) => (
        <Link
          className="result-link"
          // href={`/sumario?activeChapter=${result.chapterId}#capitulo_${result.chapterId}`}
          key={index}
          passHref
        >
          <SearchResult result={result} />
        </Link>
      ))}
    </div>
  );
};

export default SearchResultsList;
