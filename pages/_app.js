// Importação dos CSS
import '../styles/globals.css';
import '../styles/custom.css';
import '../styles/sumario.css';

// Impotação do Framework Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-ui-kit/css/mdb.min.css';
import { useEffect, useState } from 'react';
import { init } from "@socialgouv/matomo-next";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Notification from '../components/notification/Notification';
import dotenv from 'dotenv';
import Layout from '../components/layout/Layout';
import IndexedDBDataProvider from "../localDatabase/IndexedDBDataProvider";


dotenv.config();

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;


if (typeof window !== 'undefined') {
  init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
}
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch(error => {
          console.error('Erro ao registrar o Service Worker:', error);
        });
    }
  }, []);

  const [capitulos, setCapitulos] = useState([]);
  const [autores, setAutores] = useState([]);

  const capitulosData = IndexedDBDataProvider("https://api-cartilha-teste.onrender.com/api/pragas?populate=*", "api-manual",  "pragas",  "id");
  const autoresData = IndexedDBDataProvider("https://api-cartilha-teste.onrender.com/api/autors?populate=*", "api-autores",  "autores",  "id");

  useEffect(() => {
    setCapitulos(capitulosData);
  }, [capitulosData]);

  useEffect(() => {
    setAutores(autoresData);
  }, [autoresData]);



  return (
    <Layout>
      <Component {...pageProps} />
      <Notification/>
    </Layout>
  )
}

export default MyApp;
