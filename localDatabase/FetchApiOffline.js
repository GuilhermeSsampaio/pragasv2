import { toast } from "react-toastify";
import { obterDadosDoIndexedDB } from "./obterDadosDoIndexedDB";
async function FetchApiOffline(apiUrl, dbName, storeName, keyPath, isShowMsg) {
    try {
        if (!navigator.onLine) {
            if (isShowMsg) {
            toast.info(`Você está offline. Recuperando ${storeName} localmente.`);
            }
            const storedData = await obterDadosDoIndexedDB(dbName, storeName);
            return storedData;

        } else {
            if (!isShowMsg) {
                console.log(`Você está online. Recuperando ${storeName} da API.`);
                const response = await fetch(apiUrl);
                if (response.ok) {
                    const json = await response.json();
                    const data = json.data;
                    return data;
                } else {
                    throw new Error('Falha na requisição. Código de status: ' + response.status);
                }
            }
            else {
                const response = await toast.promise(fetch(apiUrl),
                    {
                        pending: `Carregando ${storeName} online...`,
                        success: `Os registros de ${storeName} foram atualizados com sucesso!`,
                        error: `Erro ao carregar os ${storeName} online.`
                    });
                if (response.ok) {
                    const json = await response.json();
                    const data = json.data;
                    return data;
                } else {
                    throw new Error('Falha na requisição. Código de status: ' + response.status);
                }
            }

        }
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        throw error; // Rejeita a Promise com o erro para que seja tratado externamente
    }
}



export default FetchApiOffline;