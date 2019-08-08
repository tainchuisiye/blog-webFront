import React from 'react';
import BaseProps from 'src/declare/baseProps';
import EditView from './EditView';
import View from './View';
import { BaseSelectViewface } from 'src/components/homeLib/Base';
export default class TuFuCube6 extends React.Component<BaseProps> {
  static EditView = EditView;
  static Preview = View;
  static type = 36;
  static title = '导航样式4';
  static info = '导航样式4';
  render() {
    return (
      <div>
        <img style={{ width: '100%' }} alt="" src={require('./TuFuCube6.png')} />
      </div>
    );
  }
}
