import MenuBean, { MenuType } from '@common/MenuBean';
import { isUrl } from '@utils/utils';

const menuData: MenuBean[] = [
  {
    title: '资产管理',
    href: '/assetsManage',
    authority: 'asset-manager',
    type: MenuType.Item
  },
  {
    title: '资产包管理',
    href: '/assetsPackageManage',
    authority: 'asset-package-manager',
    type: MenuType.Item
  },
  {
    title: '资方管理',
    href: '/capitalManage',
    authority: 'capital-manager',
    type: MenuType.Item
  },
  {
    title: '放款记录',
    href: '/loanLog',
    authority: 'capital-loan',
    type: MenuType.Item
  },
  {
    title: '客户还款记录',
    href: '/paymentHistory',
    authority: 'repayment',
    type: MenuType.Item
  }
];

function formatter(data, parentPath = '/', parentAuthority?) {
  return data.map(item => {
    let { href } = item;
    if (!isUrl(href)) {
      href = parentPath + item.href;
    }
    const result = {
      ...item,
      href,
      authority: item.authority || parentAuthority
    };
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.href}/`,
        item.authority
      );
    }
    return result;
  });
}
export default menuData;
export const getMenuData = () => formatter(menuData);
