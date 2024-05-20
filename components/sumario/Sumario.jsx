import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import TextCapitulos from '../capitulos/TextCapitulos.jsx'


export const Sumario = () => {
    //Importação das Imagens
    const router = useRouter();
    const { query } = router;
    const { asPath } = router;

    const [results, setResults] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [data, setData] = useState([]);
    const [activeTitle, setActiveTitle] = useState(null);
    const [showSummary, setShowSummary] = useState(true);
    const [expandedItems, setExpandedItems] = useState(['summary']);

    const handleTitleClick = (titleId) => {
        setActiveTitle(titleId);
        localStorage.setItem('activeChapter', titleId.toString()); // Armazena o ID no localStorage
    };    

    const openSidebar = () => {
        setIsOffcanvasOpen(true);
    };    

    const handleToggle = () => {
        setIsCollapsed((prevState) => !prevState);
    };  

    const handleToggleBackDrop = () => {
        setIsOffcanvasOpen((prevState) => !prevState);
    };
    
    const toggleSummaryAndMainMenu = () => {
        setShowSummary(!showSummary);
    };

    const handleCloseResults = () => {
        setResults([]); // Limpa os resultados
    };

    const toggleItem = (itemId) => {
        if (expandedItems.includes(itemId)) {
        setExpandedItems(expandedItems.filter((id) => id !== itemId));
        } else {
        setExpandedItems([...expandedItems, itemId]);
        }
    };

    //Função para quando o usuário clicar no botão "← Voltar para o menu principal"
    const handleToggleMainNavbar = () => {
        const mainNavbarOptionsMenu = document.getElementById('main-navbar-options-menu');
        const summary = document.getElementById('summary');
      
        if (mainNavbarOptionsMenu && summary) {
          mainNavbarOptionsMenu.style.display = 'block';
          summary.style.display = 'none';
        }
    };

    //Função para quando o usuário quiser fechar o sidebar
    const closeSidebar = () => {
        const sidebarMenu = document.getElementById("sidebarMenu");
        if (sidebarMenu) {
          sidebarMenu.classList.remove("show");
        }
        setIsOffcanvasOpen(false);
    }
   
    //useEffect para quando o usuário quiser fechar ou abrir os itens dentro do sumário do sidebar
    useEffect(() => {
        const anchorElement = document.getElementById('collapseExample1');
      
        if (anchorElement) {
            if (isCollapsed) {
                anchorElement.classList.add('collapse');
            } else {
                anchorElement.classList.remove('collapse');
          }
        }
      
        const backButton = document.getElementById('back-button');
        backButton.addEventListener('click', handleToggleMainNavbar);
      
        return () => {
            backButton.removeEventListener('click', handleToggleMainNavbar);
        };
    }, [isCollapsed]);

    //Puxando a API
    useEffect(() => {
        CarregaCapitulos();
    }, []);

    useEffect(() => {
        const chapterNumber = extractChapterNumberFromAnchor(asPath);
        if (chapterNumber !== null) {
            setActiveTitle(chapterNumber);
        }
    }, [asPath]);

    const extractChapterNumberFromAnchor = (path) => {
        const match = path.match(/#capitulo_(\d+)/);
        return match ? parseInt(match[1]) : null;
    };

    const CarregaCapitulos = async () => {
        //const url = 'https://tecnofam-strapi.a.cnpgc.embrapa.br/api/capitulos?populate=*';
        // const url = 'https://api-cartilha-teste-production.up.railway.app/api/capitulos?populate=*'
        const url = 'https://api-cartilha-teste.onrender.com/api/pragas?populate=*';

        try {
            const response = await fetch(url);
            if (response.ok) {
                const json = await response.json();
                const data = json.data;
                setData(data);

                if (asPath.includes('#capitulo_')) {
                    const chapterNumber = extractChapterNumberFromAnchor(asPath);
                    setActiveTitle(chapterNumber);
                } else if (data.length > 0) {
                    setActiveTitle(data[0].id);
                }
            } else {
                throw new Error('Falha na requisição. Código de status: ' + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (activeTitle === null) {
            // Verifique se data não é nulo e se tem pelo menos um elemento
            if (data && data.length > 0) {
              // Se for nulo, defina-o como o primeiro capítulo da API
              setActiveTitle(data[0].id);
        
              // Use useRouter para navegar para o capítulo ativo
              router.push(`/sumario?activeChapter=${data[0].id}`, undefined, { shallow: true });
            }
          }
        scrollToTop();
    }, [activeTitle, data, router]);

    const handleSubitemContent = (e) => {
        e.preventDefault();
        
        let index =+e.target.dataset.conteudoIndex;
        let chapter = +e.target.dataset.chapterIndex;
        loadContent(index, chapter);
    }

    const loadContent = (index, chapterIndex) =>{
        // setActiveTitle(item.id);
        // const targetId = `capitulo_${conteudoItem.id}`;
        // const targetElement = document.getElementById(targetId);
        // if (targetElement) {
        //     targetElement.scrollIntoView({ behavior: 'smooth' });
        // }
        const content = data[chapterIndex].attributes.conteudo[index];
        console.log(content);
    }

    // Função para rolar a página para o topo
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Adicionando um efeito de rolagem suave
        });
    };

    const activeChapter = data.find(item => item.id === activeTitle);
    const displayedTitle = activeChapter ? activeChapter.attributes.title : 'Título do Capítulo';

    return(
        <>
            <Head>
                <meta name="referrer" referrerPolicy="no-referrer" />
                <title>Manual Pragas</title>
            </Head>

            {/* Div que Pega todo o Conteúdo da Página */}
            <div className="container-wrapper">
                {/* Código Sidebar */}
                <Sidebar
                    data={data}
                    isOffcanvasOpen={isOffcanvasOpen}
                    closeSidebar={closeSidebar}
                    setShowSummary={setShowSummary}
                    showSummary={showSummary}
                    expandedItems={expandedItems}
                    toggleItem={toggleItem}
                    activeTitle={activeTitle}
                    handleTitleClick={handleTitleClick}
                    handleSubitemContent={(e, sectionId, chapterIndex) => handleSubitemContent(e, sectionId, chapterIndex)}
                    scrollToTop={scrollToTop}
                />
                
                
                {/* Conteúdo do Manual */}
                <main className='docMainContainer_gTbr'>
                    <div className='container padding-bottom--lg'>
                        <div className='col'>
                            <nav className="home-section" aria-label="Breadcrumbs" style={{marginTop: 120}}>    
                                {/* Código Navegação Estrutural | Trilha de Navegção do Usuário */}
                                <ul className="breadcrumbs">
                                    <li className="breadcrumbs__item">
                                        <Link href="/home" className="breadcrumbs__link">
                                            <i className="fas fa-home" style={{fontSize: '13px'}}></i>
                                        </Link>
                                        <i className="fas fa-chevron-right" style={{fontSize: '10px'}}></i>
                                    </li>
                                    <li className="breadcrumbs__item">
                                        <span className="breadcrumbs__link">Sumário</span>
                                        <meta itemProp="position" content="1" />
                                        <i className="fas fa-chevron-right" style={{fontSize: '10px'}}></i>
                                    </li>
                                    <li className="breadcrumbs__item breadcrumbs__item--active">
                                        <span className="breadcrumbs__link" itemProp="name">
                                            {displayedTitle}
                                        </span>
                                        <meta itemProp="position" content="2" />
                                    </li>
                                </ul>
                            </nav>
                            <section className="home-section right-sidebar" style={{marginTop: 30}}>
                                {/* Código dos Textos da Cartilha */}
                                <div id="contents" className="bd-content ps-lg-2">
                                    <TextCapitulos lista = {data} activeTitle={activeTitle} setActiveTitle={setActiveTitle} />
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>

        </>
    );
};
