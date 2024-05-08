import React from 'react';

const ChapterContent = ({ cap, activeTitle, convertToHTML, contentId }) => {
  // console.log(contentId)
  contentId = contentId ? contentId : 0;
  return (
    <article key={cap.id} className="article">
      {activeTitle === cap.id && (
        <>
          <h1>{cap.attributes.title}</h1>
          
          {cap.attributes.conteudo.length > 0 && ( // Verifica se há conteúdo na posição 0
            <div className="bd-content ps-lg-2">
              <div>{cap.attributes.conteudo[contentId].id}</div>
              <div className='center-textArticle'>{cap.attributes.conteudo[contentId].titulo_secao}</div>
              <div dangerouslySetInnerHTML={{ __html: convertToHTML(JSON.parse(cap.attributes.conteudo[contentId].texto_conteudo)) }} />
            </div>
          )}
        </>
      )}
    </article>
  );
};

export default ChapterContent;
