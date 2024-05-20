import React, { useState } from 'react';

const SumarioDropdown = ({ data, expandedItems, toggleItem, activeTitle, handleTitleClick, handleSubitemContent, scrollToTop }) => {
  const [activeSubchapter, setActiveSubchapter] = useState(null);


  const handleChapterClick = (itemId) => {
    toggleItem(itemId);
    scrollToTop();
  };

  const handleSubchapterClick = (e, chapterId, subchapterId) => {
    e.preventDefault();
    setActiveSubchapter(subchapterId);
    handleTitleClick(chapterId);
    handleSubitemContent(e, subchapterId);
    scrollToTop();
  };

  return (
    <div id="summary-content" className={`list-group list-group-flush mx-2 py-1 ${expandedItems.includes('summary') ? 'show' : 'collapse'}`}>
      {data.map((item, chapterIndex) => (
        <div key={item.id}>
          <a
            className={`list-group-item list-group-item-action py-2 ${expandedItems.includes(item.id) ? 'active' : ''}`}
            onClick={() => handleChapterClick(item.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-0">{item.attributes.title}</h6>
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
                  className={`list-group-item py-2 ${activeSubchapter === conteudoItem.id ? 'active' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <a
                    data-conteudo-index={index}
                    data-chapter-index={chapterIndex}
                    href={`#capitulo_${conteudoItem.id}`}
                    className={activeSubchapter === conteudoItem.id ? 'active-link-summary' : ''}
                    onClick={(e) => handleSubchapterClick(e, item.id, conteudoItem.id)}
                  >
                    {conteudoItem.titulo_secao}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default SumarioDropdown;
