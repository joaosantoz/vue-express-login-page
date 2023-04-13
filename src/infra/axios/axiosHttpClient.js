import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiBasePort = import.meta.env.VITE_API_PORT;

const baseUrl = `${apiBaseUrl}:${apiBasePort}`;

const httpClient = axios.create({
  baseURL: baseUrl,
});

export default httpClient;
