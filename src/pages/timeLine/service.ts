import request from 'src/utils/request-fetch';

const WelcomeService = {
  async getArticleList() {
    return request({
      method: 'get',
      url: `/api/article/list`
    });
  },
  async getTagList() {
    return request({
      method: 'get',
      url: `/api/article/tags`
    });
  },
};

export default WelcomeService;