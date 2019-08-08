import React from 'react';
import BaseProps from 'src/declare/baseProps';
import EditView from './EditView';
import View from './View';
import { BaseSelectViewface } from 'src/components/homeLib/Base';
export default class BrandGuide extends React.Component<BaseProps> {
  static EditView = EditView;
  static Preview = View;
  static type = 3;
  static title = '品牌导航栏';
  static info = '品牌导航栏';
  render() {
    return (
      <div>
        <img
          style={{ width: '100%' }}
          alt=""
          src={require('./BrandGuide.png')}
        />
      </div>
    );
  }
}
