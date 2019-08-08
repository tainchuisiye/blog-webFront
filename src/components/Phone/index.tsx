import React from 'react';
import { Button } from 'antd';
import styles from './index.less';

export default class Phone extends React.Component {
  state = {
    loading: false,
    phUrl: '/m-site/index.html'
  };
  refresh = () => {
    this.setState({
      loading: true,
      phUrl: '/m-site/index.html?t=' + Date.now()
    });
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1000);
  };
  render() {
    const { loading, phUrl } = this.state;
    return (
      <div className={styles['phone-content']}>
        <div className={styles['phone-box']}>
          <iframe
            frameBorder="no"
            className={styles['phone-wrap']}
            src={phUrl}
          />
          <Button
            loading={loading}
            className={styles['submit-btn']}
            type="primary"
            onClick={this.refresh}
          >
            刷新
          </Button>
        </div>
      </div>
    );
  }
}
