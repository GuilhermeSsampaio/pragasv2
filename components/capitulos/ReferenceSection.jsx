import React from 'react';
//renderiza as referências de cada capítulo
const ReferenceSection = ({ references, RefconvertToHTML }) => {
  return (
    <div className="references-section">
      <h3>Instituição</h3>
      {references.map((ref, index) => (
        <div key={index} className="reference">
          {ref.description && (
            <div
              className="reference-content"
              dangerouslySetInnerHTML={{ __html: RefconvertToHTML(JSON.parse(ref.description)) }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ReferenceSection;
