import axios from 'axios';
import {API_BASE} from '@env';

export const SERVER_CONFIG = {
  HOST: API_BASE,
};

export const isRequestToOurAPI = (url: string) => {
  url = url || '';
  const hasProtocol = /\:\/\//.test(url);
  const isSameDomain = RegExp(`^${SERVER_CONFIG.HOST}`).test(url);
  return !hasProtocol || isSameDomain;
};

function addHeaders(request: any) {
  if (isRequestToOurAPI(request.url)) {
    request.headers.Accept = 'application/json, text/plain, */*';
    request.headers['Content-Type'] = 'application/json';
    request.headers['Content-Length'] = Object.entries(request.body || {}).join(
      '',
    ).length;
  }
  return request;
}

function addDomain(request: any) {
  request.url = request.url || '';
  // if the url is not matching a protocol, assign the base URL
  if (
    !/\:\/\//.test(request.url) &&
    typeof SERVER_CONFIG.HOST !== 'undefined'
  ) {
    const base = SERVER_CONFIG.HOST.replace(/\/$/, '');
    const url = request.url.replace(/^\//, '');
    request.url = `${base}/${url}`;
  }
  return request;
}

function parseResponseError(error: any) {
  if (error.response) {
    return Promise.reject(error.response);
  }
  return Promise.reject(error);
}

export const axiosClient = axios.create({
  timeout: 30 * 1000, // 30 sec
});

axiosClient.interceptors.request.use(addDomain);
axiosClient.interceptors.request.use(addHeaders);
axiosClient.interceptors.response.use(undefined, parseResponseError);
