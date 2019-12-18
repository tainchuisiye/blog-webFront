import request from 'src/utils/request-fetch';

const articleService = {
  async queryArticleDetail(params: Object) {
    return request({
      params,
      method: 'get',
      url: `/api/article/findById`
    });
  },
  async getArticleList(params?) {
    return request({
      params,
      method: 'get',
      url: `/api/article/list`
    });
  },

  async addArticle(params) {
    return request({
      params,
      method: 'post',
      url: `/api/article`
    });
  },

  async updateArticle(params) {
    return request({
      params,
      method: 'post',
      url: `/api/article/update`
    });
  },

  async removeArticleById(params) {
    return request({
      params,
      method: 'post',
      url: `/api/article/deleteById`
    });
  }
};

export default articleService;
