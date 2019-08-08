import React, { Component, Fragment } from 'react';
import BaseProps from '../../declare/baseProps';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {
  Card,
  Table,
  Divider,
  Button,
  Tag,
  message,
  Popconfirm,
  Row,
  Col,
  Icon,
  Avatar,
  Radio,
  Menu
} from 'antd';
import WelcomeService from './service';
import router from 'umi/router';
import SimpleMDEEditor from 'yt-simplemde-editor';
import Markdown from 'react-remarkable';
import styles from './style.less';
import MyMarkdown from '@components/MyMarkdown';

const { Meta } = Card;

interface Props extends BaseProps {
  id: Number;
  login: String;
  email: String;
  activated: String;
  authorities: String;
  createdDate: String;
  lastModifiedBy: String;
}

export default class Welcome extends Component<BaseProps, any> {
  state = {
    dataSource: []
  };

  componentDidMount() {
    // this.getInitDataSource();
  }
  async getInitDataSource() {
    const { data: artData } = await WelcomeService.getArticleDetail();
  }

  render() {
    // tslint:disable-next-line:max-line-length
    const str =
      // tslint:disable-next-line:max-line-length
      `## sec

      - [Referrer Policy](https://www.w3.org/TR/referrer-policy/)
      
        1. no-referrer
        2. no-referrer-when-downgrade   //默认值
        3. same-origin
        4. origin
        5. strict-origin
        6. origin-when-cross-origin
        7. strict-origin-when-cross-origin
        8. unsafe-url
      
        基本思路：信任关系利`;

    return (
      <Fragment>
        <div style={{ background: '#fff', height: '100%' }}>
          <MyMarkdown source={str} />
        </div>

      </Fragment >
    );
  }
}
