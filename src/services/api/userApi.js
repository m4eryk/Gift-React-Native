import Api from './api';

export default class BasketApi extends Api {
  AUTH_URL = './user/';
  PROFILE_URL = '/api/profile/';
  USER_URL ='/api/user/';

  async login(data) {
    return this.post(`${this.AUTH_URL}login`, data);
  }

  async registration(data) {
    return this.post(`${this.AUTH_URL}registration`, data);
  }

  async getProfileInfo() {
    return this.get(this.PROFILE_URL);
  }

  async updateProfile(profile) {
    return this.put(this.PROFILE_URL, profile);
  }

  async getUser() {
    return this.get(this.USER_URL);
  }
};
