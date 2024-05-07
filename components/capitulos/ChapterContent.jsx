import React from 'react';
import ReferenceSection from './ReferenceSection';
//renderiza o conteúdo de cada capítulo
const ChapterContent = ({ cap, activeTitle, convertToHTML, RefconvertToHTML }) => {
  return (
    <div key={cap.id} className="bd-content ps-lg-2">
      {activeTitle === cap.id && <h1>{cap.attributes.title}</h1>}
      {activeTitle === cap.id && <div className="center-textArticle">{cap.attributes.subtitle}</div>}
      {activeTitle === cap.id && <div dangerouslySetInnerHTML={{ __html: convertToHTML(JSON.parse(cap.attributes.description)) }} />}
      {activeTitle === cap.id && cap.attributes.referencias && cap.attributes.referencias.length > 0 && cap.attributes.referencias[0].description != null && (
        <ReferenceSection references={cap.attributes.referencias} RefconvertToHTML={RefconvertToHTML} />
      )}
    </div>
  );
};

export default ChapterContent;
