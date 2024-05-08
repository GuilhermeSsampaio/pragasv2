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
            className={`list-group-item py-2 ${expandedItems.includes(item.id) ? 'active' : ''}`}
            onClick={() => toggleItem(item.id)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {item.attributes.title}
            {' '}
            <i className={`fas fa-chevron-${expandedItems.includes(item.id) ? 'down' : 'right'} icon-deg`} style={{ fontSize: '15px' }}></i>
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
