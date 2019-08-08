import React from 'react';
import styles from './BaseHead.less';
import { Button } from 'antd';

const BaseHead = ({ title, onSave, onReset, onRemove = null as any  }) => {
  return  (
          <div className={styles.main}  >
          <h3>{title}</h3>
          <div  className={styles.btns} >
          <Button.Group>
          <Button type="primary" onClick={onSave} >保存</Button>
          {/* <Button onClick={onReset}  >重置</Button> */}
          {onRemove ? <Button onClick={onRemove} type="danger"  >删除</Button> : ''}
          </Button.Group>
          </div>
          </div>

  );
};
export default BaseHead;
