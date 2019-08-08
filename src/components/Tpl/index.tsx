import React, { Fragment } from 'react';
interface VueProps {
  vif?: boolean;
  vshow?: boolean;
}
export default class Vue extends React.Component<VueProps> {
  render() {
    // tslint:disable-next-line:no-console
    console.log(this.props.children);
    return this.props.vif ? <Fragment>{this.props.children}</Fragment> : null;
  }
}
