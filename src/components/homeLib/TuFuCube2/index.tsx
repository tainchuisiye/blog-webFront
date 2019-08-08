import React from 'react';
import BaseProps from 'src/declare/baseProps';
import EditView from './EditView';
import View from './View';
import { BaseSelectViewface } from 'src/components/homeLib/Base';
export default class TuFuCube2 extends React.Component<BaseProps> {
  static EditView = EditView;
  static Preview = View;
  static type = 31;
  static title = '豆腐块样式1';
  static info = '豆腐块样式1';
  render() {
    return (
      <div>
        <img style={{ width: '100%' }} alt="" src={require('./TuFuCube2.png')} />
      </div>
    );
  }
}
