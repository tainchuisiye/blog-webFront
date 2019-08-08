import React from 'react';
import { Input, Button, Popover, Tooltip } from 'antd';
import styles from './index.less';
import BaseProps from '@src/declare/baseProps';
import LinkModal from '@src/components/LinkgenerPro/linkModal';
interface Props  extends BaseProps {
  onChange?: (value) => void;
  isOnlyCar: boolean;
}
export default class LinkGenerPro extends React.Component<BaseProps & {onChange?: (value) => void}> {
  static defaultProps = {
    isShowTrackValue : true
  };
  state = {
    isShow: false
  };
  handleChange = e => {
    this.props.onChange(e.target.value);
  };
  handleClick = e => {
    this.setState({ isShow: true });
  }
  handleOk = (value) => {
    this.setState({ isShow: false }, () => {
      this.props.onChange(value);
    });
  }
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
            disabled={this.props.isOnlyCars}
            onChange={this.handleChange}
            placeholder="链接"
          />
        </Tooltip>
        <Button
          className={styles.link_btn}
          type="primary"
          onClick={this.handleClick}
        >
          生成链接
        </Button>
        <LinkModal
          value={value}
          isOnlyCars={this.props.isOnlyCars}
          isShowTrackValue={this.props.isShowTrackValue}
          isShowModal={this.state.isShow}
          onCancel={() => this.setState({ isShow: false })}
          onOk={this.handleOk}
        />
      </div>
    );
  }
}
