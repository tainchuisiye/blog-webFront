import React from 'react';
import BaseProps from 'src/declare/baseProps';
export default class View   extends React.Component <BaseProps> {
  render() {
    return (
      <div
        style={{
          textAlign: 'center',
          height: '30px',
          lineHeight: '30px',
          display: 'block'
        }}
      >
        暂时并支持的模块
      </div>
    );
  }
}
