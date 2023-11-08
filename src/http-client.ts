import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from 'axios';
import { HttpMethods } from './types';

const httpClient = (axios: AxiosInstance | AxiosStatic) => {
  return (
    method: HttpMethods,
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>
  ) => {
    switch (method) {
      case 'GET':
        return axios.get(url, config);

      case 'POST':
        return axios.post(
          url,
          typeof data === 'object'
            ? data
            : typeof data === 'string' || typeof data === 'number'
            ? { data: data }
            : undefined,
          config
        );

      case 'PUT':
        return axios.put(
          url,
          typeof data === 'object'
            ? data
            : typeof data === 'string' || typeof data === 'number'
            ? { data: data }
            : undefined,
          config
        );

      case 'DELETE':
        return axios.delete(url, config);

      case 'PATCH':
        return axios.patch(
          url,
          typeof data === 'object'
            ? data
            : typeof data === 'string' || typeof data === 'number'
            ? { data: data }
            : undefined,
          config
        );

      default:
        return axios.get(url, config);
    }
  };
};

export default httpClient;
