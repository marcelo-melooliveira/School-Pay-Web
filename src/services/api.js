import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mellus.com.br',
});
export default api;
