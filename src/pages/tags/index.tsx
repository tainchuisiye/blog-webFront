import React, { Component, Fragment } from 'react';
import BaseProps from '../../declare/baseProps';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Card, Row, Col } from 'antd';
import { ColumnProps } from '../../declare/antd/table';
import { spawn } from 'child_process';
import moment from 'moment';
import router from 'umi/router';
import ArtTags from './ArtTags';

interface Props extends BaseProps {
  id: Number;
  login: String;
  email: String;
  activated: String;
  authorities: String;
  createdDate: String;
  lastModifiedBy: String;
}

function compare(property) {
  return function (a, b) {
    const value1 = a[property];
    const value2 = b[property];
    return value1 - value2;
  };
}

export default class Welcome extends Component<BaseProps, any> {
  state = {
    dataSource: []
  };
  componentDidMount() {
    //  this.getInitDataSource();
  }
  async getInitDataSource() {
    // const { data: artData } = await WelcomeService.getArticleList();
    // const { data: tagData } = await WelcomeService.getTagList();
  }

  render() {
    return (
      <Fragment>
        <PageHeaderLayout title="Tags" style={{ background: '#fff', }}>
          <div style={{ width: '100%', }}>
            <ArtTags />
          </div>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
