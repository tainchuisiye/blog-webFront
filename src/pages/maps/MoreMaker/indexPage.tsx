import React from 'react';
import BMap from 'BMap';
import BaseProps from '@src/declare/baseProps';
export default class MoreMarker extends React.PureComponent < BaseProps, any > {
  constructor(prop) {
    super(prop);
  }

  componentDidMount () {

    // const BMap = window.BMap;
    // const map = new BMap.Map('map');
    // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设    置中心点坐标和地图级别
    // map.addControl(new BMap.MapTypeControl()); // 添加地图类型控件
    // map.setCurrentCity('北京'); // 设置地图显示的城市 此项是必须设置的
    // map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
  }

  render() {

    const element1 = React.createElement(
      'script',
      { src: 'http://api.map.baidu.com/api?v=2.0&ak=tPEzaQkhezdxwV0bVbYqF3BwPUWpHaVl' , type: 'text/javascript' },
    );
    return (
      <div>
        {element1}
        <div id="map" style={{ width: '100vw', height: '100vh' }} />
      </div >
    );
  }
}