import React from 'react';
import BaseProps from 'src/declare/baseProps';
import EditView from './EditView';
import View from './View';
import { BaseSelectViewface } from 'src/components/homeLib/Base';
export default class RowScroll extends React.Component < BaseProps >  {
  static EditView = EditView;
  static Preview = View;
  static type = 11;
  static title = '导购栏样式5';
  static info = '导购栏样式5';
  render() {
    return (
      <div>
        <img style={{ width: '100%' }} alt="" src={require('./RowScroll.png')}/>
      </div>
    );
  }
}
