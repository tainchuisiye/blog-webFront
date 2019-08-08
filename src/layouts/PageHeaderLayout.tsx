import React, { CSSProperties } from 'react';
import { Link } from 'dva/router';
import PageHeader, { PageHeaderProps } from '../components/PageHeader';
import styles from './PageHeaderLayout.less';
import BaseProps from '../declare/baseProps.d';
import router from 'umi/router';

interface PageHeaderLayoutProps extends PageHeaderProps, BaseProps {
  bodyStyle?: CSSProperties;
}
// tslint:disable-next-line:no-console
console.log(router);

export default ({ children, wrapperClassName, top, ...restProps }: PageHeaderLayoutProps) => (
  <div style={{ margin: '0 -0px 0', height: '100%', width: '100%' , overflowY: 'auto' }} className={wrapperClassName}>
    {top}
    <PageHeader key="pageheader" {...restProps} linkElement={Link} />
    {children ? <div  style={restProps.bodyStyle} className={styles.content}>{children}</div> : null}
  </div>
);
