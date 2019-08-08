import React from 'react';
import BaseProps from 'src/declare/baseProps';
import EditView from './EditView';
import View from './View';
import { BaseSelectViewface } from 'src/components/homeLib/Base';
export default class Block extends React.Component < BaseProps >  {
  static EditView = EditView;
  static Preview = View;
  static type = 41;
  static title = '分割条';
  static info = '分割条';
  // static Name = 'ShoppingGuide';
  render() {
    return (
      <div
        style={{
          textAlign: 'center',
          height: 10,
          lineHeight: 10,
          background: 'rgba(245,245,249,1)'
        }}
      />
    );
  }
}
