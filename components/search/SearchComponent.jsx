import React, { useState, useEffect, useRef } from 'react';

const SearchComponent = ({ lista, onResultClick }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const results = [];

    if (Array.isArray(lista) && searchTerm.length > 0) { 
      lista.forEach((cap) => {
        cap.attributes.conteudo.forEach((item) => {
          if (
            item.titulo_secao.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            results.push({ cap, item });
          }
        });
      });
    }

    setSearchResults(results);
    setShowResults(results.length > 0); // Mostra os resultados apenas se houver algum
  }, [searchTerm, lista]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResults(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchContainerRef]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResultClick = (cap, item) => {
    onResultClick(cap, item); // Chama a função passada como prop
    setShowResults(false);
    setSearchTerm('');
  };

  return (
    <div className="input-wrapper" ref={searchContainerRef}>
      <i id="search-icon" className="fas fa-search"></i>
      <input
        className="navbar-input"
        placeholder="Pesquisar título da seção"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {showResults && (
        <div className="results-list">
          {searchResults.map(({ cap, item }) => (
            <div className="search-result-item" key={item.id} onClick={() => handleResultClick(cap, item)}>
              <p className='result-link'>{item.titulo_secao} ({cap.attributes.title})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
