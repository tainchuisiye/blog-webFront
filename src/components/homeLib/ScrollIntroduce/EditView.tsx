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
      title: '平台介绍滚动模块',
      onSave: this.handleSave,
      onReset: this.handleReset,
      onRemove: this.handleRemove
    };
    const cardStyle = {
      marginTop: '20px'
    };
    return (
      <div>
        <BaseHead {...headProps} />
        <Form>
          <Form.Item label="台介绍前面图片， 固定尺寸">
            {getFieldDecorator('moduleImgUrl', {
              rules: [{ required: true, message: '必填项' }],
              initialValue: this.props.content.contentList
                ? this.props.moduleImgUrl
                : ''
            })(<UploadImg style={{ width: '345px', height: '75px' }} />)}
          </Form.Item>
          <Card style={cardStyle}>
            <Form.Item label="标题1">
              {getFieldDecorator('contentList[0].title', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[0].title
                  : ''
              })(<Input />)}
            </Form.Item>
            <Form.Item label="链接1">
              {getFieldDecorator('contentList[0].actionUrl', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[1].actionUrl
                  : ''
              })(<LinkGenerPro />)}
            </Form.Item>
          </Card>
          <Card style={cardStyle}>
            <Form.Item label="标题2">
              {getFieldDecorator('contentList[1].title', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[0].title
                  : ''
              })(<Input />)}
            </Form.Item>
            <Form.Item label="链接2">
              {getFieldDecorator('contentList[1].actionUrl', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[1].actionUrl
                  : ''
              })(<LinkGenerPro />)}
            </Form.Item>
          </Card>
        </Form>
      </div>
    );
  }
}
