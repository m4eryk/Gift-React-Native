import axios from 'axios';
import { API_BASE_URL } from '../../configs/api.configs';

export default class Api {
  async post(url, data) {
    return axios.post(API_BASE_URL + url, data);
  }

  async get(url, params){
    return axios.get(API_BASE_URL + url, params);
  }

  async put(url, data){
    return axios.put(API_BASE_URL + url, data);
  }

  async delete(url) {
    return axios.delete(API_BASE_URL + url);
  }
};
