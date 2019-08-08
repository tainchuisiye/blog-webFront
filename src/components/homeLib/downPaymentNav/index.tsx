import React from 'react';
import BaseProps from 'src/declare/baseProps';
import EditView from './EditView';
import View from './View';
import { BaseSelectViewface } from 'src/components/homeLib/Base';
export default class DownPaymentNav extends React.Component<BaseProps> {
  static EditView = EditView;
  static Preview = View;
  static type = 14;
  static title = '首付价格导航栏';
  static info = '首付价格导航栏';
  render() {
    return (
      <div>
        <img
          style={{ width: '100%' }}
          alt=""
          src={require('./downPaymentNav.png')}
        />
      </div>
    );
  }
}
