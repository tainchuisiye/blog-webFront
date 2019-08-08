import React from 'react';
import BaseProps from 'src/declare/baseProps';
export default class View   extends React.Component <BaseProps> {
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
