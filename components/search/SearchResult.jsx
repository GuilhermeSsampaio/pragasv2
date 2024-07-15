import React from 'react';

const SearchResult = ({ result }) => {
  return (
    <div className="search-result-item">
      {result.titulo_secao} ({result.chapterTitle})
    </div>
  );
};

export default SearchResult;
