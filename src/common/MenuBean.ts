export default interface MenuBean {
  title: string;
  icon?: string;
  href?: string;
  key?: string;
  type?: MenuType;
  authority?: any;
  hideInMenu?: boolean;
  children?: MenuBean[];
}
export enum MenuType {
    SubMenu = 'SubMenu',
    ItemGroup = 'ItemGroup',
    Item = 'Item',
    Url = 'url',
}
