import React from 'react';
import BaseProps from 'src/declare/baseProps';
export default class View   extends React.Component <BaseProps> {
  render() {
    return (
      <div>
        <img style={{ width: '100%' }} alt="" src={require('./preview.png')}/>
      </div>
    );
  }
}
