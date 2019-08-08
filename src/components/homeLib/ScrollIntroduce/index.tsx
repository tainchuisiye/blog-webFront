import React from 'react';
import BaseProps from 'src/declare/baseProps';
import EditView from './EditView';
import View from './View';
import { BaseSelectViewface } from 'src/components/homeLib/Base';
export default class ScrollIntroduce extends React.Component<BaseProps> {
  static EditView = EditView;
  static Preview = View;
  static type = 6;
  static title = '平台介绍滚动模块';
  static info = '平台介绍滚动模块';
  render() {
    return (
      <div>
        <img
          style={{ width: '100%' }}
          alt=""
          src={require('./ScrollIntroduce.png')}
        />
      </div>
    );
  }
}
