import BaseModel from '@declare/baseModel';
import MenuBean, { MenuType } from '@common/MenuBean';
import menuData from '@common/menu';
import UserService from 'src/service/user';

export interface AppModelState {
  menuStatus: {
    collapsed: boolean;
    openKeys: string[];
    selectedKeys: string[];
  };
}

const initMenuStatus = {
  collapsed: false,
  openKeys: [],
  selectedKeys: []
};

// if (JSON.parse(localStorage.getItem('menuStatus'))) {
//   initMenuStatus = JSON.parse(localStorage.getItem('menuStatus'));
// }

// 全局样式风格

/**
 *  全局应用状态
 */
export default {
  namespace: 'app',
  state: {
    menuStatus: initMenuStatus,
    menuAuthority: []
  },
  reducers: {
    changeSiderMenu(state, { payload }) {
      const menuStatus = {
        ...state.menuStatus,
        ...payload
      };
      // 保存到localStorage
      // localStorage.setItem('menuStatus', JSON.stringify(menuStatus));
      return { ...state, menuStatus };
    },

    // 根据路由生成面包屑
    routerBreadcrumb(state, {}) {
      // tslint:disable-next-line:no-console
      console.log(menuData);
      return { ...state };
    },

    changeMenuAuthority(state, { payload }) {
      return { ...state, menuAuthority: [...payload] };
    }

    // 手动读取localStorge SiderMenu的中的内容
    // readLocalSiderMenu(state) {
    //   const menuStatus = JSON.parse(localStorage.getItem('menuStatus'));
    //   let { openKeys, selectedKeys } = menuStatus;
    //   // tslint:disable-next-line:no-unused-expression
    //   !openKeys ? openKeys = [] : '';
    //   // tslint:disable-next-line:no-unused-expression
    //   !selectedKeys ? selectedKeys = [] : '';
    //   state.menuStatus = menuStatus;
    //   return { ...state, menuStatus };
    // },
  },
  effects: {
    *getMenuAuthority({ payload }, { put, call }) {
      const menuAuthority = menuData.filter(item =>
        payload.authorityUrlSet.find(item2 => {
          if (item2 === item.authority || item.authority === undefined) {
            return true;
          }
        })
      );
      yield put({
        type: 'changeMenuAuthority',
        payload: menuAuthority
      });
    }
  }
} as BaseModel<AppModelState>;
