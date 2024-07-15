import { useCapitulos } from "../../hooks/useCapitulos";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Layout({ children }) {
    const router = useRouter();
    const isHome = router.pathname === '/';

    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [activeTitle, setActiveTitle] = useState(null);
    const [contentId, setContentId] = useState(null);
    const { data } = useCapitulos();

    const handleToggleBackDrop = () => {
        setIsOffcanvasOpen(!isOffcanvasOpen);
    };

    const handleResultClick = (cap, item) => {
        setActiveTitle(cap.id);
        setContentId(item.id);
    };

    return (
        <div>
            <Navbar
                isOffcanvasOpen={isOffcanvasOpen}
                handleToggleBackDrop={handleToggleBackDrop}
                lista={data}
                activeTitle={activeTitle}
                setActiveTitle={setActiveTitle}
                contentId={contentId}
                setContentId={setContentId}
                handleResultClick={handleResultClick}
            />
            {children}
            <Footer />
        </div>
    );
}
