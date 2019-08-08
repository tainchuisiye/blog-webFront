import request from 'src/utils/request-fetch';

const articleService = {
  async getArticleDetail(pramas?) {
    return request({
      method: 'get',
      url: `/api/article/list`
    });
  },
  async getArticleList(params?) {
    return request({
      params,
      method: 'get',
      url: `/api/article/list`
    });
  },
  // async updateArticle(params) {
  //   return request({
  //     params,
  //     method: 'put',
  //     url: `/api/article/list`
  //   });
  // },
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
  }
};

export default articleService;
