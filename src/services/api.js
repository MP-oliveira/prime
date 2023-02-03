import axios from 'axios';
// URL DA API /movie/now_playing?api_key=75b26930de69d408b44371a1282891ea&language=pt-BR
// BASE DA URL  https://api.themoviedb.org/3/

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
})

export default api;