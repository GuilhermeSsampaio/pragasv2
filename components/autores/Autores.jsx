import { useEffect, useState } from "react";
import Head from "next/head";
import FetchApiOffline from "../../localDatabase/FetchApiOffline.js";
import AutoresList from "./AutoresList.jsx";
import Image from 'next/image';
import Link from 'next/link';
import { SearchBar } from '../search/SearchBar';
import { SearchResultsList } from '../search/SearchResultsList';
import Logo from '../../public/logo.png'

//comnponente principal da página de Autores
export const Autores = () => {

  //Fetch para pegar os dados da api Autors criada no Strapi
  const [data, setData] = useState([]);
  const LogoIF = require("../../public/ifms-dr-marca-2015.png");
  const LogoEmbrapa = require("../../public/logo-embrapa-400.png");

  const [results, setResults] = useState([]);

  const handleCloseResults = () => {
      setResults([]); // Limpa os resultados
  };
  useEffect(() => {
    CarregaAutores();
    document.title = "Embrapa Autores";
  }, []);

  const CarregaAutores = async () => {
    try {
      const res = await FetchApiOffline(
        "https://api-cartilha-teste.onrender.com/api/autors?populate=*",
        "api-autores",
        "autores",
        "id",
        true
      );
      setData(res);
      // console.log('Autores carregados no novo jeito:', res)
    } catch (error) {
      console.error("Erro ao carregar os autores:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Manual de Identificação | Embrapa</title>
      </Head>
{/* Código Navbar Offcanvas */}
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top" aria-label="Offcanvas navbar large">
                <div className="container-fluid">
                    <div className="d-flex align-items-center">
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2">
                            <i className="fas fa-bars"></i>
                        </button>
                        {/* Logo Navbar */}
                        <Link className="navbar-brand" href="/home">
                            <Image src={Logo} width="100%" height={40} alt="logo Embrapa com letras em azul com um simbolo verde, sendo que as letras em cima do simbolo são brancas" />
                        </Link>
                    </div>
                    {/* Input Search para tela menor que 992px */}
                    <div className="search-container first-form-search p-1">
                        <div className="search-bar-container">
                            <SearchBar setResults={setResults} />
                            {results && results.length > 0 && <SearchResultsList results={results} handleCloseResults={handleCloseResults} />}
                        </div>
                    </div>

                    {/* Código dos Itens Exibidos no Navbar */}
                    <div className="offcanvas offcanvas-start text-bg-light" tabIndex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
                        <div className="offcanvas-header">
                            <ul className="navbar-nav d-flex links-logo-ifembrapa flex-row mx-1">
                                {/* Logo IF / Embrapa Dentro do Menu */}
                                <li className="nav-item">
                                    <Link href="/home">
                                        <Image src={LogoIF} className='img-navbar-menu me-3' width="100%" height={46} alt="logo Embrapa com letras em azul com um simbolo verde, sendo que as letras em cima do simbolo são brancas" priority />
                                    </Link>
                                </li>
                            </ul>
                            <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <hr className="featurette-divider"></hr>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 center-itens">
                                <li className="nav-item">
                                    <Link className="nav-link back-item-link" href="/sumario" aria-current="page">
                                        Sumário
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link back-item-link" href="/autores" aria-current="page">
                                        Autores
                                    </Link>
                                </li>
                            </ul>
                            {/* Input Search para tela maior que 992px */}
                            <div id="searchForm" className="search-container position-relative p-1">
                                <div className="search-bar-container">
                                    <SearchBar setResults={setResults} />
                                    {results && results.length > 0 && <SearchResultsList results={results} handleCloseResults={handleCloseResults} />}
                                </div>
                            </div>
                            <ul className="navbar-nav d-flex links-logo flex-row">
                                <li className="nav-item second-logo-inst">
                                    <Image src={LogoIF} className='logotipo me-3' width="100%" height={32} alt="Logotiopo do IFMS Campus Dourados" priority />
                                </li>
                                <li className="nav-item second-logo-inst">
                                    <Image src={LogoEmbrapa} className='logotipo' width="100%" height={48} alt="Logotiopo da Embrapa" priority />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
      {/* Conteúdos dos Autores */}
      <div className="showcaseSection">
        <div className="headerTitle">
          <h1>Autores</h1>
        </div>
        <AutoresList data={data} />
        </div>
    </>
  );
};
