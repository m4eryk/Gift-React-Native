import Api from './api';

export default class GiftApi extends Api {
  GIFT_URL = '/api/gift/';

  async createGift(data) {
    return this.post(`${this.GIFT_URL}`, data);
  }

  async deleteGift(id) {
    return this.delete(`${this.GIFT_URL}${id}`);
  }

  async getGift(id) {
    return this.get(`${this.GIFT_URL}${id}`);
  }

  async getRandomGift() {
    return this.get(`${this.GIFT_URL}random`);
  }

  async getGifts(params) {
    return this.get(`${this.GIFT_URL}`, {params: params});
  }

  async updateGift(id, data) {
    return this.put(`${this.GIFT_URL}${id}`, data);
  }
};
