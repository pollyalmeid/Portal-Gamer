const BASE_URL_API = 'https://api.rawg.io/api';
const API_KEY = 'fbd8f396d59a418cae32138f9ff036cc';
const MESSAGE_ERROR = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';

async function getGamers(page) {
    page = page ? page : 1;
    try {
        return await $.ajax({
            url: `${BASE_URL_API}/games?key=${API_KEY}&page=${page}`,
        });
    } catch (e) {
        alert(MESSAGE_ERROR);
    }       
}

async function getGamerId(id) {
    try {
        return await $.ajax({
            url: `${BASE_URL_API}/games/${id}?key=${API_KEY}`,
          
        });
    } catch (e) {
        alert(MESSAGE_ERROR);
    } 
}

async function searchGamers(search) {
    try {
        return await $.ajax({
            url: `${BASE_URL_API}/games?key=${API_KEY}&search=${search}?key=${API_KEY}`,
            
        });
    } catch (e) {
        alert(MESSAGE_ERROR);
    }
}