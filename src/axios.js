import axios from 'axios';
import { getBaseUrl } from './components/helpers/Utils';

const apiInstance = axios.create({
  baseURL: getBaseUrl(process.env.REACT_APP_BACKEND_HOST + '/api'),
});

export const rootApiServer = axios.create({
  baseURL: getBaseUrl(process.env.REACT_APP_BACKEND_HOST),
});

export const staticServer = axios.create({
  baseURL: getBaseUrl(process.env.REACT_APP_STATIC_STATIC_URL),
});

const initAxios = () => {
  const authToken = localStorage.getItem('auth.token');
  if (!authToken) return;

  apiInstance.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
};

initAxios();

export default apiInstance;
