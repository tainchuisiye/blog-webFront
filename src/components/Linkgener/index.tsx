import React from 'react';
import { Input, Button, Popover, Tooltip } from 'antd';
import styles from './index.less';
import BaseProps from '@src/declare/baseProps';

export default class LinkGener extends React.Component<BaseProps> {
  onChange = e => {
    this.props.setValue({ value: e.target.value });
  };
  render() {
    const { value } = this.props;
    return (
      <div className={styles.link_wrap}>
        <Tooltip
          placement="topLeft"
          title={value}
          style={{ wordWrap: 'break-word', width: 150 }}
          autoAdjustOverflow
          arrowPointAtCenter
        >
          <Input
            className={styles.link_input}
            value={value}
            onChange={this.onChange}
            placeholder="链接"
          />
        </Tooltip>
        <Button
          className={styles.link_btn}
          type="primary"
          onClick={this.props.click}
        >
          生成链接
        </Button>
      </div>
    );
  }
}
