import React, { Fragment } from 'react';
import renderAuthorize, { AuthorizedProps } from '@components/Authorized';
import { connect } from 'dva';
let Authorized = null;
interface Props extends AuthorizedProps {
  account?: any;
}

@connect(({ user }) => ({
  account: user.account,
}))
export default class Authority extends React.PureComponent<Props, any> {
  componentWillReceiveProps(nextProps) {
    // tslint:disable-next-line:no-console
    // console.log(this.props.account);
    if (nextProps.account !== null && Authorized === null) {
      // tslint:disable-next-line:no-console
      // console.log(111);
      Authorized = renderAuthorize(nextProps.account.authorityUrlSet);
    }
  }
  render () {
    // tslint:disable-next-line:no-console
    // console.log('?????');
    if (this.props.account === null || Authorized === null) {
      return null;
    }
    return (
        <Authorized  authority={this.props.authority} noMatch={this.props.noMatch}  >
            {this.props.children}
        </Authorized>
    );
  }
}