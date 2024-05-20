export default function CardAutor({ item, descriptionData }) {
    // Verifica se item e descriptionData são nulos ou indefinidos antes de acessar suas propriedades
    if (!item || !descriptionData) {
      return null; // Retorna null se os dados do autor não estiverem disponíveis
    }

    return (
      <div key={item.id} className="card">
        <div className="containerAutor_v1t1">
          {/* Imagem dos Autores */}
          <div className="containerFoto_oz_I">
            {/* Certifica-se de que a URL da imagem está disponível antes de renderizar */}
            {descriptionData.blocks[0]?.data?.file?.url && (
              <img
                src={`${descriptionData.blocks[0].data.file.url}`}
                alt="Foto dos Autores"
                width="100%"
              />
            )}
          </div>
          {/* Nome dos Autores */}
          <p className="bold nome-autor">{item.attributes.name}</p>
        </div>
        {/* Descrição dos Autores */}
        <div className="cardContainer_HEVx">
          {/* Certifica-se de que a descrição do autor está disponível antes de renderizar */}
          {descriptionData.blocks[1]?.data?.text && (
            <p className="descricao-autor">{descriptionData.blocks[1].data.text}</p>
          )}
        </div>
        {/* Link para o Currículo dos Autores */}
        <div className="action-card">
          {/* Extrai e renderiza todos os links da descrição */}
          {descriptionData.blocks.map((block) => {
            if (block.type === "paragraph") {
              // Verifica se há uma tag <a> dentro do bloco de parágrafo
              const match = block.data.text.match(/<a[^>]*>.*?<\/a>/g);
              if (match) {
                return match.map((link, index) => (
                  <div key={index} dangerouslySetInnerHTML={{ __html: link }} />
                ));
              }
            }
            return null;
          })}
        </div>
      </div>
    );
  }
  