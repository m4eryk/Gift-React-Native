import Api from './api';

export default class LikeApi extends Api {
  GIFT_URL = '/api/like/';

  async setLike(data) {
    return this.post(`${this.GIFT_URL}`, data);
  }

  async deleteLike(id) {
    return this.delete(`${this.GIFT_URL}${id}`);
  }

  async getLikes() {
    return this.get(`${this.GIFT_URL}`);
  }
};
