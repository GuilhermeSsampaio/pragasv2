import { useState, useEffect } from "react";
import FetchApiOffline from "../../localDatabase/FetchApiOffline";
export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  const fetchData = (value) => {
    fetch("https://api-cartilha-teste.onrender.com/api/pragas?populate=*")
      .then((response) => response.json())
      .then((data) => {
        const results = [];
        data.data.forEach((praga) => {
          praga.attributes.conteudo.forEach((item) => {
            if (item.titulo_secao.toLowerCase().includes(value.toLowerCase())) {
              results.push(praga);
            }
          });
        });
        setResults(results);
        setShowNoResultsMessage(results.length === 0 && value.trim() !== ""); 
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setResults([]);
        setShowNoResultsMessage(true);
      });
  };  

  const handleChange = (value) => {
    setInput(value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      fetchData(value.toLowerCase());
    }, 200);

    setTypingTimeout(timeout);
  };

  useEffect(() => {
    setResults([]);
    setShowNoResultsMessage(false);
  }, [input]);

  return (
    <div className="input-wrapper">
      <i id="search-icon" className="fas fa-search"></i>
      <input
        className="navbar-input"
        placeholder="Buscar"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      {showNoResultsMessage && <div className="results-list"><p className='result-nulo'>Nenhum resultado encontrado para "{input}".</p></div>}
    </div>
  );
};