// import React, { useEffect, useState } from 'react';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import TextCapitulos from '../capitulos/TextCapitulos.jsx';
// import Sidebar from '../sidebar/Sidebar.jsx';
// import Breadcrumbs from './Breadcrumbs.jsx';
// import { useCapitulosData } from '../../hooks/useCapitulosData';
// import { useSidebar } from '../../hooks/useSidebar';

// export const Sumario = () => {
//   const router = useRouter();
//   const { asPath } = router;
//   const [activeTitle, setActiveTitle] = useState(null);

//   const { data, clickedSectionId, loadContent } = useCapitulosData(asPath, setActiveTitle);
//   const {
//     isCollapsed,
//     isOffcanvasOpen,
//     expandedItems,
//     showSummary,
//     toggleItem,
//     handleToggle,
//     handleToggleBackDrop,
//     toggleSummaryAndMainMenu,
//     setIsOffcanvasOpen,
//     setShowSummary,
//   } = useSidebar();

//   useEffect(() => {
//     if (activeTitle === null && data.length > 0) {
//       setActiveTitle(data[0].id);
//       router.push(`/sumario?activeChapter=${data[0].id}`, undefined, { shallow: true });
//     }
//   }, [activeTitle, data, router]);

//   const activeChapter = data.find((item) => item.id === activeTitle);
//   const displayedTitle = activeChapter ? activeChapter.attributes.title : 'Título do Capítulo';

//   const handleSubitemContent = (e) => {
//     e.preventDefault();
//     const index = +e.target.dataset.conteudoIndex;
//     const chapter = +e.target.dataset.chapterIndex;
//     loadContent(index, chapter);
//   };

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <>
//       <Head>
//         <meta name="referrer" referrerPolicy="no-referrer" />
//         <title>Manual Pragas</title>
//       </Head>

//       <div className="container-wrapper">
//         <Sidebar
//           data={data}
//           isOffcanvasOpen={isOffcanvasOpen}
//           closeSidebar={() => setIsOffcanvasOpen(false)}
//           setShowSummary={setShowSummary}
//           showSummary={showSummary}
//           expandedItems={expandedItems}
//           toggleItem={toggleItem}
//           activeTitle={activeTitle}
//           handleTitleClick={setActiveTitle}
//           handleSubitemContent={handleSubitemContent}
//           scrollToTop={scrollToTop}
//         />

//         <main className="docMainContainer_gTbr">
//           <div className="container padding-bottom--lg">
//             <div className="col">
//               <Breadcrumbs displayedTitle={displayedTitle} />
//               <section className="home-section right-sidebar" style={{ marginTop: 30 }}>
//                 <div id="contents" className="bd-content ps-lg-2">
//                   <TextCapitulos lista={data} activeTitle={activeTitle} setActiveTitle={setActiveTitle} />
//                 </div>
//               </section>
//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };
