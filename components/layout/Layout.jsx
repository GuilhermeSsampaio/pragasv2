// src/components/layout/Layout.jsx
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Layout({ children }) {
    const router = useRouter();
    const isHome = router.pathname === '/';

    // Mover o estado e funções do sidebar para o Layout
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [lista, setLista] = useState([]); // Novo estado para armazenar os dados da API
    const [activeTitle, setActiveTitle] = useState(null);
    const [contentId, setContentId] = useState(null);

    const handleToggleBackDrop = () => {
        setIsOffcanvasOpen(!isOffcanvasOpen);
    };

    const closeSidebar = () => {
        setIsOffcanvasOpen(false);
    };

    useEffect(() => {
        fetch('https://api-cartilha-teste.onrender.com/api/pragas?populate=*')
            .then(response => response.json())
            .then(data => setLista(data))
            .catch(error => console.error('Erro ao buscar dados da API:', error));
    }, []);
    return (
        <div>
            <Navbar
                isOffcanvasOpen={isOffcanvasOpen}
                handleToggleBackDrop={handleToggleBackDrop}
                closeSidebar={closeSidebar}
                home={isHome}
                // Passando as novas propriedades para o Navbar
                lista={lista}
                activeTitle={activeTitle}
                setActiveTitle={setActiveTitle}
                contentId={contentId}
                setContentId={setContentId}

            />
            {children}
            <Footer />
        </div>
    );
}
