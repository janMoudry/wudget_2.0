import axios, { AxiosRequestConfig } from "axios";

axios.defaults.baseURL = process.env.API_URL;

const get = async (
  url: string,
  params?: unknown,
  restParams?: AxiosRequestConfig<unknown>
) => {
  const response = await axios.get(url, { ...restParams, params });

  return response.data;
};

const post = async (
  url: string,
  data: unknown,
  restParams?: AxiosRequestConfig<unknown>
) => {
  const response = await axios.post(url, data, restParams);

  return response.data;
};

export const api = {
  get,
  post,
};
