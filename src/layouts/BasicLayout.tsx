import { Icon, Layout, message, Menu, Spin } from 'antd';
import classNames from 'classnames';
import { connect } from 'dva';
import { enquireScreen } from 'enquire-js';
import React, { Fragment } from 'react';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
// import logo from 'src/assets/logo.svg';
import GlobalHeader from '@components/GlobalHeader';
import SiderMenu from '@components/SiderMenu';
import router from 'umi/router';
import BaseProps from '../declare/baseProps.d';
import renderAuthorize from '../components/Authorized';
import '../components/homeLib/HomeTabs/style.less';
import Authority from '@components/Authorized/Authority';
import Exception from '@components/Exception';
const { Content, Header, Footer, Sider } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200
  }
};

let isMobile: boolean;
enquireScreen(b => {
  isMobile = b;
});

@connect(({ app }) => ({
  menuStatus: app.menuStatus,
  menuAuthority: app.menuAuthority
}))
class BasicLayout extends React.Component<BaseProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      isReady: false
    };
    this.ready();
  }
  async ready() {
    await this.props.dispatch({
      type: 'user/getAccount'
    });
    this.setState({
      isReady: true
    });
  }
  handleChangeMenu = menuStatus => {
    this.props.dispatch({
      type: 'app/changeSiderMenu',
      payload: menuStatus
    });
  };

  componentWillMount() {
    const token = localStorage.getItem('id_token');
    if (!token || token === 'undefined') {
      router.replace('/user/login');
      return;
    }
  }

  public render() {
    const noReady = (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Spin tip="Loading..." />
      </div>
    );
    if (!this.state.isReady) {
      return noReady;
    }
    if (this.props.menuAuthority.length <= 0) {
      return <Exception type="403" />;
    }
    const { collapsed, selectedKeys, openKeys } = this.props.menuStatus;
    const layout = (
      <Layout>
        <SiderMenu
          selectedKeys={selectedKeys}
          isMobile={this.state.isMobile}
          collapsed={collapsed}
          openKeys={openKeys}
          changeMenuStatus={this.handleChangeMenu}
        />
        <Layout>
          <Content style={{ margin: '0px 0px 0', height: 0 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
    return (
      <DocumentTitle title={`SIYE's-Blog`}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default BasicLayout;
