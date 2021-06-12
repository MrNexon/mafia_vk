import axios, { AxiosResponse } from 'axios';
import { rootStore } from './Redux/Store';

export class HttpService {
  private static getDefaultParams() {
    const { Auth } = rootStore.getState();
    const data = {
      baseURL: 'http://localhost:3001/',
      headers: {},
    };

    if (Auth.accessToken) data.headers = { ...data.headers, Authorization: `Bearer ${Auth.accessToken}` };

    return data;
  }

  public static get<R>(baseClass: string, method: string, params?: any): Promise<AxiosResponse<R>> {
    return axios.request<R>({
      url: `${baseClass}/${method}`,
      method: 'GET',
      params: params,
      ...this.getDefaultParams(),
    });
  }

  public static post<R>(baseClass: string, method: string, data?: any): Promise<AxiosResponse<R>> {
    return axios.request<R>({
      url: `${baseClass}/${method}`,
      method: 'POST',
      data: data,
      ...this.getDefaultParams(),
    });
  }
}
