import React from 'react';
import { Card, Menu } from 'antd';
import styles from './SiderMenuLists.less';
import { MenuMode } from 'antd/lib/menu';
import BaseProps from 'src/declare/baseProps';
const Item = Menu.Item;

export default class SliderMenuLists extends React.Component<BaseProps> {
  state = {
    mode: 'inline'
  };
  main = null;
  getmenu = () => {
    const { menuMap } = this.props;
    return Object.keys(menuMap).map(item => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };
  getRightTitle = () => {
    const { menuMap, selectKey } = this.props;
    return menuMap[selectKey];
  };
  resize = () => {
    if (!this.main) {
      return;
    }
    let mode = 'inline';
    const { offsetWidth } = this.main;
    if (this.main.offsetWidth < 641 && offsetWidth > 400) {
      mode = 'horizontal';
    }
    if (window.innerWidth < 768 && offsetWidth > 400) {
      mode = 'horizontal';
    }
    this.setState({
      mode
    });
  };
  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  render() {
    const { mode } = this.state;
    const { rightBlock, onChange, selectKey } = this.props;
    return (
      <div
        className={styles.main}
        ref={ref => {
          this.main = ref;
        }}
      >
        <div className={styles.leftmenu}>
          <Menu
            selectedKeys={[selectKey]}
            onClick={({ key }) => onChange({ key })}
            mode={mode as MenuMode}
          >
            {this.getmenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            {this.getRightTitle()}
          </div>
          {rightBlock}
        </div>
      </div>
    );
  }
}
