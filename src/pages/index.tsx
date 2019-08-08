import React from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';

export default connect(({ app }) => ({ menuAuthority: app.menuAuthority }))(
  ({ menuAuthority }) => {
    return (
      <div>
        <Redirect to={{ pathname: '/home' }} />
      </div>
    );
  }
);
