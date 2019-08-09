import React, { Component, Fragment } from 'react';
import BaseProps from '../../declare/baseProps';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Card, Table, Divider, Button, Tag, message, Popconfirm, Row, Col } from 'antd';
import WelcomeService from './service';
import router from 'umi/router';
import Markdown from 'react-remarkable';
import MyMarkdown from '@components/MyMarkdown';

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
    const str = '## Reasons React is great 1. Server-side rendering 2. This totally works: ```<SomeOtherAmazingComponent />``` Pretty neat!';

    return (
      <Fragment>
        <PageHeaderLayout title="文章">
          <Row>
            <Col lg={6}>菜单</Col>
            <Col lg={12}>
              {/* <Markdown source={str} /> */}
              <MyMarkdown source={str} />
            </Col>
            <Col lg={6}>
              评论
            </Col>
          </Row>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
