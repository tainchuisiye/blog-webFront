import UserService from '../service/user';
import BaseModel from '@declare/baseModel';

export interface UserModelState {}

export default {
  namespace: 'user',
  state: {
    account: null
  },
  reducers: {
    setAccount(state, { payload: account }) {
      return { ...state, account };
    }
  },
  effects: {
    *getAccount({ payload }, { put, call, select }) {
      const { data, status } = yield call(UserService.getAccount);
      if (status === 200 && data) {
        yield put({
          type: 'setAccount',
          payload: data
        });
        yield put({
          type: 'app/getMenuAuthority',
          payload: data
        });
      }
    },
    *getUserInfo({ payload }, { put, call, select }) {
      const { data, status } = yield call(UserService.getUserInfo);
      if (status === 200 && data) {
        // tslint:disable-next-line:no-console
        console.log(data);
      }
    }
  }
} as BaseModel<UserModelState>;
