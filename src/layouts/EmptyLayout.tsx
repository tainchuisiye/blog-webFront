import React from 'react';
import DocumentTitle from 'react-document-title';
declare var window: any;
export default class EmptyLayout extends React.Component {
  componentWillMount() {
    window.document.getElementById('root').style.height = '100%';
    window.document.getElementById('root').style.overflowY = 'auto';
  }
  render() {
    return (
      <DocumentTitle title={'SIYE-ADMIN'}>
        <div style={{ height: '100%' }}>{this.props.children}</div>
      </DocumentTitle>
    );
  }
}
