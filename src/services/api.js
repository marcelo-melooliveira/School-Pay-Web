import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mellus.com.br',
  // baseURL: 'http://192.168.1.2:3333',
});
export default api;
