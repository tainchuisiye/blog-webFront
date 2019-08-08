import React, { Component, Fragment } from 'react';
import BaseProps from '../../declare/baseProps';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Card, Row, Col } from 'antd';
import { ColumnProps } from '../../declare/antd/table';
import WelcomeService from './service';
import { spawn } from 'child_process';
import moment from 'moment';
import router from 'umi/router';
import ArtTags from './ArtTags';
import TimeLine from './TimeLine';

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
    const { data: artData } = await WelcomeService.getArticleList(); 
    const { data: tagData } = await WelcomeService.getTagList();
  }

  render() {
    return (
      <Fragment>
        <PageHeaderLayout title="Welcome">
        <div style={{ width: '98%' }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 50 }}>
          <Col xs={24} sm={16} md={24} lg={7}> 
             <ArtTags />
          </Col>
          <Col xs={24} sm={16} md={24} lg={10}> 
             <TimeLine />
          </Col>
        </Row> 
        </div>
          
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
