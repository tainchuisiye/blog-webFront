import React from 'react';
import BaseProps from 'src/declare/baseProps';
import { Form, Input, Card, Alert, Button } from 'antd';
import UploadImg from '../../UploadImg';
import { EditViewProps } from 'src/components/homeLib/Base';
import LinkGenerPro from 'src/components/LinkgenerPro';
import BaseHead from 'src/components/homeLib/BaseHead';
@(Form.create as any)()
export default class EditView extends React.Component <EditViewProps> {
  handleSave = () => {
    //
    this.props.form.validateFields({ force: true }, async (err, values) => {
      // tslint:disable-next-line:no-console
      console.log(values);
      if (!err) {
        this.props.onChange(values);
      }
    });
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  handleRemove = () => {
    this.props.onRemove(this.props.index, this.props.id);
  }
  render() {
    return (
    <div
      style={{
        textAlign: 'center',
        height: 30,
        lineHeight: 30
      }}
    >
      暂时并支持的模块
      <Button  onClick={this.handleRemove}  >
        删除
      </Button>
    </div>);
  }
}
