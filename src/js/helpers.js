import { TIMEOUT_SEC } from './config.js';

const timeout = (s)=>{
    return new Promise(function (_, reject) {
    setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} seconds`));
      }, s * 1000);
    });
};

export const getJSON = async function(url) {
    try {
        const fetchPro = fetch(url);
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (error) {
        throw error;
    }
}

