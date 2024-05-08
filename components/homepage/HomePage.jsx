import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/logo.png'
import InstallButton from '../utils/InstallButton'
import InstallButtonIos from '../utils/InstallButtonIos'
import { SearchBar } from "../search/SearchBar.jsx";
import { SearchResultsList } from "../search/SearchResultsList.jsx";
import { isAndroid, isIOS, isDesktop } from 'react-device-detect'
export const HomePage = () => {
    //Importação das Imagens
    var LogoIF = require('../../public/ifms-dr-marca-2015.png');
    var LogoEmbrapa = require('../../public/logo-embrapa-400.png');
    var LogoIFEmbrapa = require('../../public/logo-if-embrapa.png');
    var LogoCartilha = require('../../public/logo-cartilha.svg');   
    var Adeney = require('../../public/adeney.jpg');   
    const [results, setResults] = useState([]);
    
    const handleCloseResults = () => {
        setResults([]); // Limpa os resultados
    };

    return(
        <>
            <Head>
                <meta name="referrer" referrerPolicy="no-referrer" />
                <title>Manual Pragas</title>
            </Head>
            

            {/* Conteúdos da Página Principal */}
            <div className="px-4 py-5 text-center hero content-after-navbar">
                <div className='hero-text'>
                    <div className='messagem'>
                        <Image className="d-block mx-auto mb-2" src={LogoCartilha} alt="Logo da cartilha" width="100%" height="128"/>
                        <h1 className="display-5 fw-bold">Manual de Identificação de Insetos e outros Invertebrados da Cultura da Soja</h1>
                    </div>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4">4<sup>a</sup> edição atualizada</p>
                        <div className="d-grid container-botoes">
                            <Link href="/edicao-completa" type="button" className="btn">
                                Descubra mais sobre Pragas na Soja
                            </Link>
                            {/* <a id='btn-instalar' href="#" className='btn'>Instalar</a> */}
                            {isDesktop && <InstallButton />}
                            {isAndroid && <InstallButton />}
                            {isIOS && <InstallButtonIos />}
                        </div>
                    </div>
                </div>
            </div>

            <div className="apresentacao">
                <div className="titulo">
                    <p>Você sabia que boa parte das publicações das minibibliotecas da Embrapa estão disponíveis em formato digital? Conheça a quarta edição atualizada da publicação Manual de identificação de insetos e outros invertebrados da cultura da soja.</p>
                </div>
                <div className="texto-container">
                    <h1>Apresentação</h1>
                    <div className="texto">
                        <p>A identificação precisa de pragas é etapa crucial para o correto diagnóstico em campo, necessária para a tomada de decisão de manejo e escolha da melhor estratégia de controle quando necessário. Espécies semelhantes podem apresentar suscetibilidades diferentes a um mesmo inseticida, assim como comportamentos diferentes. Portanto, erros no reconhecimento da espécie podem levar a fracassos do manejo dessas pragas.</p>
                        <p>Sendo assim, este manual tem como objetivos facilitar e orientar na identificação rápida das espécies de invertebradospragas mais importantes encontradas na cultura da soja. A identificação da espécie, com o auxílio de imagens contidas nesta publicação, permite obter informações adicionais existentes sobre a praga além de orientação para o seu encaminhamento a um especialista para identificação definitiva.</p>
                        <p>Dessa forma, esta publicação é útil para agricultores, estudantes e profissionais que desenvolvem atividades relacionadas à cultura da soja, especialmente naquelas ligadas ao manejo integrado de pragas.</p>
                        <p>Nesta quarta edição, foram atualizadas informações referentes às pragas da soja, além de algumas fotos contidas no manual, visando sempre levar a melhor informação disponível ao campo.</p>
                    </div>
                    <div className="autor">
                        <Image src={Adeney} alt="Foto do Adeney" className='img' width="100%" height={100}/>
                        <p className="nome">Adeney de Freitas Bueno</p>
                        <p className="cargo">Chefe-Adjunto de Pesquisa e Desenvolvimento</p>
                        <p className="cargo">Embrapa Soja</p>
                    </div>
                </div>
            </div>
                          
        </>
    );
};
