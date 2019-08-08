import React from 'react';
import BaseProps from 'src/declare/baseProps';
import { Form, Input, Card, Alert } from 'antd';
import UploadImg from '../../UploadImg';
import { EditViewProps } from 'src/components/homeLib/Base';
import LinkGenerPro from 'src/components/LinkgenerPro';
import BaseHead from 'src/components/homeLib/BaseHead';
@(Form.create as any)()
export default class EditView extends React.Component<EditViewProps> {
  handleSave = () => {
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
      title: '活动导航栏',
      onSave: this.handleSave,
      onReset: this.handleReset,
      onRemove: this.handleRemove
    };
    return (
      <div>
        <BaseHead {...headProps} />
        <Form>
          <Form.Item label="图片">
            {getFieldDecorator('contentInfo.picUrl', {
              rules: [{ required: true, message: '必填项' }],
              initialValue: this.props.content.contentInfo
                ? this.props.content.contentInfo.picUrl
                : ''
            })(
              <UploadImg
                width={750}
                style={{ width: '94px', height: '62px' }}
              />
            )}
            <Alert
              message="请上传格式为png或gif的图片,宽度为750px"
              type="info"
              showIcon
            />
          </Form.Item>
          <Form.Item label="链接">
            {getFieldDecorator('contentInfo.actionUrl', {
              initialValue: this.props.content.contentInfo
                ? this.props.content.contentInfo.actionUrl
                : ''
            })(<LinkGenerPro isShowTrackValue={false} />)}
          </Form.Item>
          <Form.Item label="打点值">
            {getFieldDecorator('contentInfo.trackValue', {
              initialValue: this.props.content.contentInfo
                ? this.props.content.contentInfo.trackValue
                : ''
            })(<Input />)}
          </Form.Item>
        </Form>
      </div>
    );
  }
}
