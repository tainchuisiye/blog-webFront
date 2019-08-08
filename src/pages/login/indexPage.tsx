import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from 'src/components/Login';
import styles from './login.less';
import ModelState from 'src/declare/modelState';
import UserService from 'src/service/user';
import axios from 'axios';
import request from '@utils/request-fetch';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;
@connect(({ user, loading }) => ({
  user,
  submitting: loading.effects['user/login'],
}))
export default class LoginPage extends Component<any, any> {
  state = {
    type: 'account',
    autoLogin: true,
  };
  onTabChange = (type) => {
    this.setState({ type });
  }

  handleSubmit = (err, values) => {
    // tslint:disable-next-line:no-console
    console.log(1);
    UserService.authenticate({ ...values }).then((data) => {
      // tslint:disable-next-line:no-console
      console.log(data);
    });

  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }

  render() {
    const { login, submitting, user: { loginStatus } } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Link to="/">
          <span className={styles.title}>SIYE</span>
        </Link>
        {/* <span className={styles.title}>SIYE</span> */}
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >

          <Tab key="account" tab="账户密码">
            {/* {
             loginStatus === 200 ? '' : this.renderMessage('账户或密码错误')
            } */}
            <UserName name="username" placeholder="" />
            <Password name="password" placeholder="" />
          </Tab>
          {/* <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
            <a style={{ float: 'right' }} href="">忘记密码</a>
          </div> */}
          <Submit loading={submitting}>登录</Submit>
          {/* <div className={styles.other}>
            其他登录方式
            <Icon className={styles.icon} type="alipay-circle" />
            <Icon className={styles.icon} type="taobao-circle" />
            <Icon className={styles.icon} type="weibo-circle" />
            <Link className={styles.register} to="/user/register">注册账户</Link>
          </div> */}
        </Login>
      </div>
    );
  }
}
