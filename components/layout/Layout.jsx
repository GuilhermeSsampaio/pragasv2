// src/components/layout/Layout.jsx
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Layout({ children }) {
    const router = useRouter();
    const isHome = router.pathname === '/';

    // Mover o estado e funções do sidebar para o Layout
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    const handleToggleBackDrop = () => {
        setIsOffcanvasOpen(!isOffcanvasOpen);
    };

    const closeSidebar = () => {
        setIsOffcanvasOpen(false);
    };

    return (
        <div>
            <Navbar 
                isOffcanvasOpen={isOffcanvasOpen} 
                handleToggleBackDrop={handleToggleBackDrop} 
                closeSidebar={closeSidebar} 
                home={isHome} 
            />
            {children}
            <Footer />
        </div>
    );
}
