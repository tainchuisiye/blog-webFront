import React from 'react';
import BaseProps from 'src/declare/baseProps';
import EditView from './EditView';
import View from './View';
import { BaseSelectViewface } from 'src/components/homeLib/Base';
export default class NotFound extends React.Component < BaseProps >  {
  static EditView = EditView;
  static Preview = View;
  // static type = 32;
  static title = '暂时并支持的模块';
  static info = '暂时并支持的模块';
  // static Name = 'ShoppingGuide';
  render() {
    return (
      <div
        style={{
          textAlign: 'center',
          height: 30,
          lineHeight: 30
        }}
      >
        暂时并支持的模块
      </div>
    );
  }
}
