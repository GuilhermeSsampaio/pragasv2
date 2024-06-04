import CardAutor from "./CardAutor.jsx";
//componente que renderiza a lista de autores passando os dados para o CardAutor
const AutoresList = ({ data }) => {
  return (
    <div className="main-container-cards container-cards">
      {data.length > 0 ? (
        data.map((item) => {
          const descriptionData = JSON.parse(item.attributes.description);
          return <CardAutor key={item.id} item={item} descriptionData={descriptionData} />;
        })
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};

export default AutoresList;
