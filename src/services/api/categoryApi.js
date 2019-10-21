import Api from './api';

export default class CategoryApi extends Api {
  CATEGORY_URL = '/api/category/';

  async createCategory(data) {
    return this.post(`${this.CATEGORY_URL}`, data);
  }

  async deleteCategory(id) {
    return this.delete(`${this.CATEGORY_URL}${id}`);
  }

  async getCategories() {
    return this.get(this.CATEGORY_URL);
  }

  async getCategory(id) {
    return this.get(`${this.CATEGORY_URL}${id}`);
  }

  async updateCategory(id, data) {
    return this.put(`${this.CATEGORY_URL}${id}`, data);
  }
};
