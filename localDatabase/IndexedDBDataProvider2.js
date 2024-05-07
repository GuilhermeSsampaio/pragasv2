import React, { useEffect, useState } from 'react';
import { abrirBancoDeDados, updateDataLocally, obterDadosDoIndexedDB } from './IndexedDBManager';
import { fetchDataFromAPI } from './APIManager';

const IndexedDBDataProvider = ({ apiUrl, dbName, storeName, keyPath }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let storedData = [];
                if (!navigator.onLine) {
                    console.log('Você está offline. Recuperando dados do IndexedDB.');
                    storedData = await obterDadosDoIndexedDB(dbName, storeName);
                } else {
                    console.log('Você está online. Recuperando dados da API.');
                    const responseData = await fetchDataFromAPI(apiUrl);
                    storedData = responseData.data;
                    await updateDataLocally(dbName, storeName, storedData);
                }
                setData(storedData);
            } catch (error) {
                console.error(error);
                if (!navigator.onLine) {
                    console.log('Você está offline. Recuperando dados do IndexedDB.');
                    const storedData = await obterDadosDoIndexedDB(dbName, storeName);
                    setData(storedData);
                } else {
                    console.error('Erro ao carregar os dados da API:', error.message);
                }
            }
        };

        fetchData();
    }, [apiUrl, dbName, storeName, keyPath]);

    return data;
};

export default IndexedDBDataProvider;
