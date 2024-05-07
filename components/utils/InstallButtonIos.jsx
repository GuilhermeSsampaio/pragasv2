import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { DownloadNotification } from '../notification/Notification';

// Componente que renderiza o botão de instalação para ios (PWA)

const InstallButtonIos = () => {
    const [showInstructions, setShowInstructions] = useState(false);

    const showInstallInstructions = () => {
        setShowInstructions(true);
    };

    const closeInstructions = () => {
        setShowInstructions(false);
        DownloadNotification(); // Chama a função DownloadNotification após fechar as instruções
    };

    return (
        <div>
            <button className='btn btnIos' onClick={showInstallInstructions}>Adicionar à Tela de Início</button>
            {showInstructions && (
                <div id="instructions" style={{ 
                    position: 'fixed', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '5px', 
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', 
                    zIndex: '9999' 
                }}>
                    <button className='btnIos button' onClick={closeInstructions} style={{ position: 'absolute', top: '10px', right: '10px' }}>Fechar</button>
                    <p style={{ marginBottom: '10px' }}>Para instalar este app no seu iPhone:</p>
                    <ol style={{ paddingLeft: '20px' }}>
                        <li>Abrir o Safari e navegar para <Link href='#'> [link correto]</Link>.</li>
                        <li>Tocar no botão de compartilhamento na barra de navegação.</li>
                        <li>Deslizar e tocar em "Adicionar à Tela de Início".</li>
                        <li>Confirmar tocando em "Adicionar".</li>
                    </ol>
                </div>
            )}
        </div>
    );
};

export default InstallButtonIos;
