import Api from './api';

export default class BasketApi extends Api {
  AUTH_URL = '/api/authentication/';
  USER_URL ='/api/user/';

  async login(data) {
    return this.post(`${this.AUTH_URL}login`, data);
  }

  async registration(data) {
    return this.post(`${this.AUTH_URL}registration`, data);
  }

  async getUser() {
    return this.get(this.USER_URL);
  }
};
