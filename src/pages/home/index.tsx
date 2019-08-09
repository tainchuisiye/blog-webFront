import React, { Component, Fragment } from 'react';
import BaseProps from '../../declare/baseProps';
// import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {
  Card, Tag, Icon
} from 'antd';
import WelcomeService from './service';
import router from 'umi/router';
import SimpleMDEEditor from 'yt-simplemde-editor';
import Markdown from 'react-remarkable';
import styles from './style.less';
import MyMarkdown from '@components/MyMarkdown';
import Item from 'antd/lib/list/Item';
import moment from 'moment';

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

const dateFormat = 'YYYY-MM-DD HH:mm';

export default class Welcome extends Component<BaseProps, any> {
  state = {
    dataSource: []
  };

  componentDidMount() {
    this.getInitDataSource();
  }
  async getInitDataSource() {
    const dataSource = await WelcomeService.getArticleDetail();
    this.setState({ dataSource });
  }

  artCard() {
    const { dataSource } = this.state;
    if (!Array.isArray(dataSource)) { return; }
    return dataSource.map(({ title, id, content, keyword, createTime, modifyTime, desc }) => {
      return (
        <div key={id} className={styles.artBox}>
          <div className={styles.boxHead}>
            <span className={styles.title}>{title}</span>
            <span className={styles.timer}>
              <b>Time：</b>{modifyTime ? `${moment(modifyTime).format(dateFormat)}` : null}
            </span>
          </div>
          <div className={styles.desc}>
            {content}
            {/* <MyMarkdown source={content} /> */}
          </div>
          {keyword ?
            <div className={styles.tags}>
              {<span ><Icon type="tag" className={styles.icon} /> <Tag color="blue">{keyword}</Tag></span>}
            </div> : null
          }

        </div>
      );
    });

  }

  render() {
    const { dataSource } = this.state;
    return (
      <Fragment>
        <div>
          <div className={styles.header}>最新文章</div>
          <div style={{ background: '#fff', height: '100%' }}>
            {this.artCard()}
          </div>
        </div>

      </Fragment >
    );
  }
}
