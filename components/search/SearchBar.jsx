import { useState, useEffect } from "react";
import FetchApiOffline from "../../localDatabase/FetchApiOffline"; // Certifique-se de importar o componente FetchApiOffline corretamente

// Componente que realiza a pesquisa de capítulos
export const SearchBar = ({ searchTerm, handleSearchChange } ) => {
 
  return (
    <div className="input-wrapper">
      <i id="search-icon" className="fas fa-search"></i>
      <input
        className="navbar-input"
        placeholder="Buscar"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {/* {showNoResultsMessage && (
        <div className="results-list">
          <p className="result-nulo">Nenhum resultado encontrado para "{input}".</p>
        </div>
      )} */}
    </div>
  );
};
