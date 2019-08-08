import React from 'react';
import BaseProps from 'src/declare/baseProps';
import EditView from './EditView';
import View from './View';
import { BaseSelectViewface } from 'src/components/homeLib/Base';
export default class HomeTabs extends React.Component < BaseProps >  {
  static EditView = EditView;
  static Preview = View;
  static type = 0;
  static title = '首页Tabs';
  static info = '首页Tabs';
  // static Name = 'ShoppingGuide';
  render() {
    return (
      <div>
        <img style={{ width: '100%' }} alt="" src={require('./preview.png')}/>
      </div>
    );
  }
}
