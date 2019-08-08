import React from 'react';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import withRouter from 'umi/withRouter';
import BasicLayout from '@layouts/BasicLayout';
import EmptyLayout from '@layouts/EmptyLayout';
import UserLayout from '@layouts/UserLayout';
import HomeLayout from '@layouts/home';

class MainLayout extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  public render() {
    const props = this.props;
    let layout = null;
    // tslint:disable-next-line:no-console
    console.log(props.location);
    if (props.location.pathname === '/login') {
      layout = <UserLayout {...props} />;
      // } else if (props.location.pathname === '/welcome') {
      //   layout = <BasicLayout {...props} />;
    } else if (props.location.pathname.indexOf('admin') !== -1) {
      layout = <EmptyLayout {...props} />;
    } else {
      // layout = <EmptyLayout {...props} />;
      layout = <HomeLayout {...props} />;
    }

    return (<LocaleProvider locale={zh_CN}>{layout}</LocaleProvider>);
  }
}

export default withRouter(MainLayout);
