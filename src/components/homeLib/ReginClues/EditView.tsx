import React from 'react';
import BaseProps from 'src/declare/baseProps';
import { Form, Input, Card, Alert } from 'antd';
import UploadImg from '../../UploadImg';
import { EditViewProps } from 'src/components/homeLib/Base';
import LinkGenerPro from 'src/components/LinkgenerPro';
import BaseHead from 'src/components/homeLib/BaseHead';
import Colorful from '../../Colorful';
@(Form.create as any)()
export default class EditView extends React.Component<EditViewProps> {
  handleSave = () => {
    //
    this.props.form.validateFields({ force: true }, async (err, values) => {
      if (!err) {
        this.props.onChange(values);
      }
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  handleRemove = () => {
    this.props.onRemove(this.props.index, this.props.id);
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const headProps = {
      title: '预约买车',
      onSave: this.handleSave,
      onReset: this.handleReset,
      onRemove: this.handleRemove
    };
    return (
      <div>
        <BaseHead {...headProps} />
        <Form>
          <Form.Item label="颜色 ">
            {getFieldDecorator('contentInfo.color', {
              initialValue: this.props.content.contentInfo
                ? this.props.content.contentInfo.color
                : '',
              rules: [{ required: true, message: '必填项' }]
            })(<Colorful />)}
          </Form.Item>
          <Form.Item label="图片">
            {getFieldDecorator('contentInfo.iconUrl', {
              rules: [{ required: true, message: '必填项' }],
              initialValue: this.props.content.contentInfo
                ? this.props.content.contentInfo.iconUrl
                : ''
            })(
              <UploadImg
                style={{ width: '176px', height: '90px' }}
                width={176}
                height={90}
              />
            )}
            <Alert
              message="格式为png或gif，尺寸176px*90px"
              type="info"
              showIcon
            />
          </Form.Item>
        </Form>
      </div>
    );
  }
}
