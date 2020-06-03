import axios from 'axios';

const api = axios.create({
  baseURL: 'http://178.128.154.80:3333',
});

export default api;
