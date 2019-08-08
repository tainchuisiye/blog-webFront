import React from 'react';
import BaseProps from 'src/declare/baseProps';
import EditView from './EditView';
import View from './View';
import { BaseSelectViewface } from 'src/components/homeLib/Base';
export default class AddSmallBanner extends React.Component < BaseProps >  {
  static EditView = EditView;
  static Preview = View;
  static type = 10;
  static title = '小banner';
  static info = '小banner';
  render() {
    return (
      <div>
        <img style={{ width: '100%' }} alt="" src={require('./AddSmallBanner.png')}/>
      </div>
    );
  }
}
