// src/components/navbar/Navbar.jsx
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchComponent from "../search/SearchComponent";
import Logo from "../../public/logo.png";

const Navbar = ({
  isOffcanvasOpen,
  handleToggleBackDrop,
  closeSidebar,
  home,
  lista,
  activeTitle,
  setActiveTitle,
  contentId,
  setContentId,
  handleResultClick, // Novas props
}) => {
  const [results, setResults] = useState([]);
  const LogoIF = require("../../public/ifms-dr-marca-2015.png");
  const LogoEmbrapa = require("../../public/logo-embrapa-400.png");
  // const [contentId, setContentId] = useState(null);

  // const handleResultClick = (cap, item) => {
  //   setActiveTitle(cap.id);
  //   setContentId(item.id);
  // }
  const handleCloseResults = () => {
    setResults([]);
  };
  // console.log("Navbar", lista);

  return (
    <nav
      id="main-navbar"
      className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle Offcanvas"
          onClick={handleToggleBackDrop}
        >
          <i className="fas fa-bars"></i>
        </button>
        {/* Logo Navbar */}
        <Link className="navbar-brand" href="/home">
          <Image
            src={Logo}
            width="100%"
            height={40}
            alt="logo Embrapa com letras em azul com um simbolo verde, sendo que as letras em cima do simbolo são brancas"
          />
        </Link>
        {/* Código dos Itens Exibidos no Navbar */}
        <ul className="navbar-nav ms-auto d-flex flex-row">
          <li className="nav-item text-item-link">
            <Link
              className="nav-link back-item-link"
              href="/sumario"
              aria-current="page"
            >
              <span className="link-text">Sumário</span>
            </Link>
          </li>
          <li className="nav-item text-item-link">
            <Link
              className="nav-link back-item-link"
              href="/autores"
              aria-current="page"
            >
              <span className="link-text">Autores</span>
            </Link>
          </li>
          {/* Input Search para tela maior que 992px */}
          <div className="hide-form-search2">
            <form
              className="d-flex rounded-pill position-relative first-form-search"
              role="search"
            >
              <div className="search-bar-container p-1">
                <SearchComponent
                  lista={lista}
                  onResultClick={handleResultClick}
                />{" "}
                {/* Passa a função como prop */}
              </div>
            </form>
          </div>

          <li className="nav-item">
            <Image
              src={LogoIF}
              className="logotipo img"
              width={130}
              height={35}
              alt="Logotipo do IFMS Campus Dourados"
              priority
            />
          </li>
          <li className="nav-item me-lg-0">
            <Image
              src={LogoEmbrapa}
              className="logotipo img"
              width={70}
              height={48}
              alt="Logotipo da Embrapa"
              priority
            />
          </li>

          {/* Input Search para tela menor que 992px */}
          <form className="d-flex rounded-pill position-relative" role="search">
            <div className="input-group hide-form-search">
              <div className="search-bar-container">
                <SearchComponent
                  lista={lista}
                  onResultClick={handleResultClick}
                />{" "}
                {/* Passa a função como prop */}
              </div>
            </div>
          </form>
        </ul>
      </div>
      {isOffcanvasOpen && (
        <div
          className="offcanvas-backdrop show"
          onClick={handleToggleBackDrop}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
