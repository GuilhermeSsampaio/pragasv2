export const SearchResult = ({ result }) => {
  
  // Mapeia cada item de conteúdo para um componente SearchResult
  return (
    <div className="search-result">
        {result.titulo_secao}
    </div>
  );
};
