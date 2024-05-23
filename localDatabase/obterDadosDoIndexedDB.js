export async function obterDadosDoIndexedDB(dbName, storeName) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onerror = (event) => {
            console.error('Erro ao abrir o banco de dados:', event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction([storeName], 'readonly');
            const objectStore = transaction.objectStore(storeName);
            const getAllRequest = objectStore.getAll();

            getAllRequest.onsuccess = (event) => {
                const data = event.target.result;
                console.log('Dados recuperados do IndexedDB:', data);
                resolve(data);
            };

            getAllRequest.onerror = (event) => {
                console.error('Erro ao obter os dados do IndexedDB:', event.target.error);
                reject(event.target.error);
            };
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore(storeName, { keyPath: 'id' });
            objectStore.createIndex('id', 'id', { unique: true });
        };
    });
}
