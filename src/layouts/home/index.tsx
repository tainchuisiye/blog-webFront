import React, { Component, Fragment } from 'react';
import BaseProps from '../../declare/baseProps';
import { Card, Row, Col, Icon, Layout } from 'antd';
import WelcomeService from './service';
import router from 'umi/router';
import Markdown from 'react-remarkable';
import { enquireScreen } from 'enquire-js';
import styles from './style.less';
import cardImg from '@assets/images/card.jpeg';

import { connect } from 'dva';
const { Meta } = Card;

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

interface Props extends BaseProps {
  id: Number;
  login: String;
  email: String;
  activated: String;
  authorities: String;
  createdDate: String;
  lastModifiedBy: String;
}

@connect(({ app }) => ({
  menuStatus: app.menuStatus,
  menuAuthority: app.menuAuthority
}))

export default class Welcome extends Component<BaseProps, any> {
  state = {
    dataSource: [],
    btnRouter: [
      { name: '首页', pathname: '/home' },
      { name: '时光轴', pathname: '/timeLine' },
      { name: '关于我', pathname: '/about' }
    ],
    iconRouter: [
      { name: '文章标签', pathname: '/tags', icon: 'tags' },
      { name: '留言', pathname: '/message', icon: 'message' },
      { name: '设置', pathname: '/setting', icon: 'setting' }
    ]
  };
  componentDidMount() {
    // this.getInitDataSource();
  }
  async getInitDataSource() {
    const { data: artData } = await WelcomeService.getArticleDetail();
  }

  infoBox = () => {
    const { iconRouter, btnRouter } = this.state;
    return (
      <Card
        className={styles.cardStyle}
        cover={
          <img
            alt="example"
            src={cardImg}
            style={{ height: '100%' }}
          />
        }
      >
        <Meta
          title="SIYE"
          className={styles.mateStyle}
          description="时光似风，带走了季节，也带走了青春的温度。思绪万千，愿它能够传答给懂你的人......"
        />
        <div className={styles.cardTag}>
          <Row>
            {iconRouter.map(({ pathname, icon }, index) => {
              return (
                <Col key={index} span={24 / iconRouter.length} className={styles.iconBtn}>
                  <Icon
                    type={icon}
                    onClick={() => {
                      router.push({ pathname });
                    }}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
        <div className={styles.menu}>
          <ul>
            {btnRouter.map(({ name, pathname }, index) => {
              return (
                <li
                  key={index}
                  className={
                    router.location.pathname === pathname ? styles.active : null
                  }
                  onClick={() => {
                    router.push({ pathname });
                  }}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      </Card>
    );
  };

  // @log('trytyy')
  render() {
    return (
      <Fragment>
        <Layout>
          <Layout>
            <div
              style={{
                minWidth: '960px',
                margin: '60px auto',
                display: 'flex',
                width: '70%'
              }}
            >
              <div style={{ width: '220px' }}>
                {this.infoBox()}
                <span className={styles.copyRight}>
                  Copyright © 2019-2029 siye All Right Reserved
                </span>
              </div>
              <Content
                className={styles.content}
                style={{ height: document.body.clientHeight - 60 * 2 }}
              >
                <div style={{ height: '100%' }}>{this.props.children}</div>
              </Content>
            </div>
          </Layout>
        </Layout>
      </Fragment>
    );
  }
}
