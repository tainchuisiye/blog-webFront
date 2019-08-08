import React from 'react';
import BaseProps from 'src/declare/baseProps';
import EditView from './EditView';
import View from './View';
import { BaseSelectViewface } from 'src/components/homeLib/Base';
export default class Line extends React.Component < BaseProps >  {
  static EditView = EditView;
  static Preview = View;
  static type = 40;
  static title = '分割线';
  static info = '分割线';
  // static Name = 'ShoppingGuide';
  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 10,
          lineHeight: '10px',
          background: 'rgba(245,245,249,1)'
        }}
      >
        <span style={{ display: 'inline-block', width: '100%', height: 1, backgroundColor: '#000' }}   />
      </div>
    );
  }
}
