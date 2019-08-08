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
// import WelcomeService from './service';
import router from 'umi/router';
import Markdown from 'react-remarkable';
import styles from './style.less';

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
    const sun = new Image();
    const moon = new Image();
    const earth = new Image();
    function init() {
      sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
      moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
      earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
      window.requestAnimationFrame(draw);
    }

    function draw() {
      let ctx;
      try {
        ctx = document.getElementById('about').getContext('2d');
      } catch (error) {
        return;
      }
      // const ctx = document.getElementById('about').getContext('2d');

      ctx.globalCompositeOperation = 'destination-over';
      ctx.clearRect(0, 0, 300, 300); // clear canvas

      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.strokeStyle = 'rgba(0,153,255,0.4)';
      ctx.save();
      ctx.translate(150, 150);

      // Earth
      const time = new Date();
      ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
      ctx.translate(105, 0);
      ctx.fillRect(0, -12, 50, 24); // Shadow
      ctx.drawImage(earth, -12, -12);

      // Moon
      ctx.save();
      ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
      ctx.translate(0, 28.5);
      ctx.drawImage(moon, -3.5, -3.5);
      ctx.restore();

      ctx.restore();

      ctx.beginPath();
      ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
      ctx.stroke();

      ctx.drawImage(sun, 0, 0, 300, 300);

      window.requestAnimationFrame(draw);
    }

    init();

    // const c = document.getElementById('about');
    // const ctx = c.getContext('2d');
    // ctx.font = '30px Arial';
    // ctx.fillText('吃鸡大佬', 10, 50);
  }
  async getInitDataSource() {
    // const { data: artData } = await WelcomeService.getArticleDetail();
  }

  render() {
    // tslint:disable-next-line:max-line-length
    const str =
      // tslint:disable-next-line:max-line-length
      '## Reasons React is great 1. Server-side rendering 2. This totally works: ```<SomeOtherAmazingComponent />``` Pretty neat!';

    return (
      <Fragment>
        <div style={{ height: '100%', background: '#000' }}>
          <canvas
            height="400"
            width="500"
            style={{ margin: 'auto', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
            id="about"
          />
        </div>

      </Fragment >
    );
  }
}
