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