import React from 'react';
import BaseProps from 'src/declare/baseProps';
export default class View   extends React.Component <BaseProps> {
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
