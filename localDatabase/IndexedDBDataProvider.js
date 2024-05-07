import { useEffect, useState } from 'react';

const IndexedDBDataProvider = (apiUrl, dbName, storeName, keyPath) => {
    const [data, setData] = useState([]);

    const abrirBancoDeDados = async () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, 1);
            request.onerror = (event) => {
                reject(event.target.error);
            };
            request.onsuccess = (event) => {
                resolve(event.target.result);
                console.log(`Banco de dados ${dbName} aberto com sucesso.`);
            };
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName, { keyPath: keyPath });
                }
            };
        });
    };

    const updateDataLocally = async (data) => {
        try {
            const db = await abrirBancoDeDados();
            const transaction = db.transaction([storeName], "readwrite");
            const store = transaction.objectStore(storeName);
            data.forEach(item => {
                store.add(item);
            });
            console.log(`Dados atualizados localmente no banco ${storeName}`);
        } catch (error) {
            console.error("Erro ao atualizar dados localmente:", error);
        }
    };

    const obterDadosDoIndexedDB = async () => {
        try {
            const db = await abrirBancoDeDados();
            const transaction = db.transaction([storeName], "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            return new Promise((resolve, reject) => {
                request.onsuccess = function(event) {
                    resolve(event.target.result);
                };
                request.onerror = function(event) {
                    reject(event.target.error);
                };
            });
        } catch (error) {
            console.error("Erro ao obter dados do IndexedDB:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let storedData = [];
                if (!navigator.onLine) {
                    console.log('Você está offline. Recuperando dados do IndexedDB.');
                    storedData = await obterDadosDoIndexedDB();
                } else {
                    console.log('Você está online. Recuperando dados da API.');
                    const response = await fetch(apiUrl);
                    if (response.ok) {
                        const json = await response.json();
                        storedData = json.data;
                        await updateDataLocally(storedData);
                    } else {
                        throw new Error('Falha na requisição. Código de status: ' + response.status);
                    }
                }
                setData(storedData);
            } catch (error) {
                console.error(error);
                if (!navigator.onLine) {
                    console.log('Você está offline. Recuperando dados do IndexedDB.');
                    const storedData = await obterDadosDoIndexedDB();
                    setData(storedData);
                } else {
                    console.error('Erro ao carregar os dados da API:', error.message);
                }
            }
        };
    
        fetchData();
    }, [apiUrl, dbName, storeName, keyPath]); // Adicionando os parâmetros como dependências

    return data;
};

export default IndexedDBDataProvider;
