import React from 'react';
import BaseProps from 'src/declare/baseProps';
import EditView from './EditView';
import View from './View';
import { BaseSelectViewface } from 'src/components/homeLib/Base';
export default class CountDown extends React.Component<BaseProps> {
  static EditView = EditView;
  static Preview = View;
  static type = 5;
  static title = '活动导航栏带倒计时';
  static info = '活动导航栏带倒计时';
  render() {
    return (
      <div>
        <img
          style={{ width: '100%' }}
          alt=""
          src={require('./CountDown.png')}
        />
      </div>
    );
  }
}
