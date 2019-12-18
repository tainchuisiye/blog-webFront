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
  Col
} from 'antd';
import services from './service';
import router from 'umi/router';
import Markdown from 'react-remarkable';
import MyMarkdown from '@components/MyMarkdown';
import styles from './style.less';
import moment from 'moment';

interface Props extends BaseProps {
  id: Number;
}

export default class Welcome extends Component<BaseProps, any> {
  state = {
    dataSource: { content: '', title: '', createTime: '' }
  };
  componentDidMount() {
    // this.getInitDataSource();
    this.getArticleInfo();
  }
  async getArticleInfo() {
    const { id } = this.props.location.query;
    const data = await services.queryArticleDetail({ id });
    this.setState({ dataSource: data });
  }

  render() {
    const { content, title, createTime } = this.state.dataSource;
    return (
      /*  */
      <Fragment>
        <div className={styles.articleBox}>
          <header>
            <div className={styles.title}>{title}</div>
            <div className={styles.dateTime}>
              发布日期： {moment(createTime).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <div className={styles.tags}>
              发布日期： {moment(createTime).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          </header>
          <section className={styles.content}>
            <MyMarkdown source={content || ''} />
          </section>
        </div>
      </Fragment>
    );
  }
}
