import React, { useState } from 'react';
import { Capitulos } from './Capitulos';
import TextCapitulos from './TextCapitulos';

const SumarioDropdown = ({ data, expandedItems, toggleItem, activeTitle, handleTitleClick, setContentId , handleSubitemContent}) => {
  const [clickedItemId, setClickedItemId] = useState(null);

  return (
    <div id="summary-content" className={`list-group list-group-flush mx-2 py-1 ${expandedItems.includes('summary') ? 'show' : 'collapse'}`}>
      {data.map((item, chapterIndex) => (
        <div key={item.id}>
          <a
            className={`list-group-item list-group-item-action py-2 ${expandedItems.includes(item.id) ? 'active' : ''}`}
            onClick={() => toggleItem(item.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">{item.attributes.title}</h5>
                {item.attributes.subtitle && (
                  <span className="subtitle font-size-lg">{item.attributes.subtitle}</span>
                )}
              </div>
              <i className={`fas fa-chevron-${expandedItems.includes(item.id) ? 'down' : 'right'} ml-2`} style={{ fontSize: '15px' }}></i>
            </div>
          </a>

          {expandedItems.includes(item.id) && (
            <ul className="list-group list-group-flush mx-2 py-1">
              {item.attributes.conteudo.map((conteudoItem, index) => (
                <li
                  key={conteudoItem.id}
                  className={`list-group-item py-2 ${activeTitle === item.id ? 'active' : ''}`}
                  onClick={() => { handleTitleClick(item.id); }}
                  style={{ cursor: 'pointer' }}
                >
                  <a
                    data-conteudo-index={index}
                    data-chapter-index={chapterIndex}
                    href={`#capitulo_${conteudoItem.id}`}
                    className={activeTitle === item.id ? 'active-link-summary' : ''}
                    onClick={(e) => handleSubitemContent(e, conteudoItem.id)}
                  >
                    {conteudoItem.titulo_secao}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {clickedItemId !== null && (
        <div className="clicked-item-content">
          {data.map((item) => (
            item.attributes.conteudo.map((conteudoItem) => (
              conteudoItem.id === clickedItemId && (
                <div key={conteudoItem.id}>
                  <h3>{conteudoItem.titulo_secao}</h3>
                  <p>{conteudoItem.texto_conteudo}</p>
                </div>
              )
            ))
          ))}
        </div>
      )}
    </div>
  );
};

export default SumarioDropdown;
