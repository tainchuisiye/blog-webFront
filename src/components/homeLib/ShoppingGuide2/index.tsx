import React from 'react';
import BaseProps from 'src/declare/baseProps';
import EditView from './EditView';
import View from './View';
import { BaseSelectViewface } from 'src/components/homeLib/Base';
export default class ShoppingGuide2 extends React.Component < BaseProps >  {
  static EditView = EditView;
  static Preview = View;
  static type = 33;
  static title = '导购栏样式2';
  static info = '导购栏样式2';
  // static Name = 'ShoppingGuide';
  render() {
    return (
      <div>
        <img style={{ width: '100%' }} alt="" src={require('./preview.png')}/>
      </div>
    );
  }
}
