
import request from 'src/utils/request-fetch';
import  { errorProcess } from '@utils/request';

const UserService = {
  async getAccount() {
    return request({
      method: 'get',
      url: `/api/account?cacheBuster=1535008960350`
    }).then(errorProcess);
  },
  async getUserInfo() {
    return request({
      method: 'get',
      url: `/api/users/me`
    }).then(errorProcess);
  },
  async authenticate(params) {
    return request({
      params,
      method: 'get',
      url: `/api/users/authenticate`
    }).then(errorProcess);
  },
};
export default UserService;