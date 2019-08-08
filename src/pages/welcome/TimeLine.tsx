import React, { Component, Fragment } from 'react';
import BaseProps from '../../declare/baseProps';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Card, Row, Col, Timeline } from 'antd';
import WelcomeService from './service';
import moment from 'moment';
import router from 'umi/router';
import style from './style.less';

interface Props extends BaseProps {
  id: Number;
  login: String;
  email: String;
  activated: String;
  authorities: String;
  createdDate: String;
  lastModifiedBy: String;
}
const art = `文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容`;
export default class TimeLine extends Component<BaseProps, any> {
  state = {
    dataSource: Array(10).fill({
      title: '文章标题',
      content: art,
      times: `2015-09-01`
    })
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
        <PageHeaderLayout title="时间轴">
          <Timeline  mode="alternate">
            {this.state.dataSource.map(({ title, content, times }, index) => {
              return (
                <Timeline.Item key={index} className={style.timeLine}>
                  <span className={style.title}>{title}</span>
                  <span className={style.tiems} style={{ float: (index % 2) === 0 ? 'right' : 'left' }}>{times}</span>
                  <Card hoverable={true} >{content}</Card>
                </Timeline.Item>
              );
            })
            // tslint:disable-next-line:jsx-curly-spacing
            }
          </Timeline>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
