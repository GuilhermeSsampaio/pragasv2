import { useEffect, useState } from "react";
import Head from "next/head";
import FetchApiOffline from "../../localDatabase/FetchApiOffline.js";
import CardAutor from "./CardAutor.jsx";
import AutoresList from "./AutoresList.jsx";

export const Autores = () => {

  //Fetch para pegar os dados da api Autors criada no Strapi
  const [data, setData] = useState([]);

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
        <title>Autores</title>
      </Head>

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
