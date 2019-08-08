import { Form, Icon, Layout, Menu } from 'antd';
import pathToRegexp from 'path-to-regexp';
import React, { Component } from 'react';
import menuData from '@common/menu';
// import { urlToList } from '../utils/pathTools';
import MenuBean, { MenuType } from '@common/MenuBean';
import Link from 'umi/link';
import styles from './index.less';
import { connect } from 'dva';

const { Sider } = Layout;
const { SubMenu } = Menu;
const { ItemGroup } = Menu;
const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};
@connect(({ app }) => ({ menuAuthority: app.menuAuthority }))
class SiderMenu extends Component<any, any> {
  constructor(props) {
    super(props);
  }
  public handleChangeMenu = (panams: any) => {
    this.props.changeMenuStatus(panams);
  };

  public getNavMenuItems = (menusData: MenuBean[]) => {
    if (!menusData) {
      return [];
    }
    function renderTitle(item) {
      return item.icon ? (
        <span>
          <span>{item.title}</span>
        </span>
      ) : (
        item.title
      );
    }
    return menusData.map(item => {
      let view = null;
      switch (item.type) {
        case MenuType.SubMenu:
          view = (
            <SubMenu title={renderTitle(item)} key={item.href}>
              {this.getNavMenuItems(item.children)}
            </SubMenu>
          );
          break;
        case MenuType.ItemGroup:
          view = (
            <ItemGroup title={renderTitle(item)} key={item.title}>
              {this.getNavMenuItems(item.children)}
            </ItemGroup>
          );
          break;
        case MenuType.Item:
          view = (
            <Menu.Item key={item.href}>
              <Link to={item.href}>{renderTitle(item)}</Link>
            </Menu.Item>
          );
          break;
        case MenuType.Url:
          view = (
            <Menu.Item key={item.href}>
              <a href={item.href} target="_blank">
                {renderTitle(item)}
              </a>
            </Menu.Item>
          );
          break;
        default:
          view = (
            <Menu.Item key={item.href}>
              <Link to={item.href}>{renderTitle(item)}</Link>
            </Menu.Item>
          );
          break;
      }
      return view;
    });
  };
  public render() {
    const { collapsed, logo, openKeys, selectedKeys, menuAuthority } = this.props;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={collapse => {
          this.handleChangeMenu({ collapsed: collapse });
        }}
        width={256}
        className={styles.sider}
      >
        {/*
          <div className={styles.logo} key="logo">
          <Link to="/">
           <img src={logo} alt="logo" /> <h1>demo</h1>
          </Link>
          </div>
      */}

        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          className={styles.menu}
          openKeys={openKeys}
          onOpenChange={openKey => {
            this.handleChangeMenu({ openKeys: openKey });
          }}
          selectedKeys={selectedKeys}
          style={{ padding: '16px 0', width: '100%' }}
        >
          {this.getNavMenuItems(menuAuthority)}
        </Menu>
      </Sider>
    );
  }
}
export default SiderMenu;
