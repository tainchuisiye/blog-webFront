import React from 'react';
import BaseProps from 'src/declare/baseProps';
import EditView from './EditView';
import View from './View';
import { BaseSelectViewface } from 'src/components/homeLib/Base';
export default class TuFuCube1 extends React.Component<BaseProps> {
  static EditView = EditView;
  static Preview = View;
  static type = 2;
  static title = '4个豆腐块';
  static info = '4个豆腐块';
  render() {
    return (
      <div>
        <img style={{ width: '100%' }} alt="" src={require('./TuFuCube1.png')} />
      </div>
    );
  }
}
