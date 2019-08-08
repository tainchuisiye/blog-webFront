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
      title: '豆腐块样式1',
      onSave: this.handleSave,
      onReset: this.handleReset,
      onRemove: this.handleRemove
    };
    const labelStyle = {
      labelCol: { span: 4 },
      wrapperCol: { span: 19, push: 1 }
    };
    const cardStyle = {
      marginTop: '20px'
    };
    return (
      <div>
        <BaseHead {...headProps} />
        <Form>
          <Card title="豆腐块1" style={cardStyle}>
            <Form.Item label="豆腐块1图片">
              {getFieldDecorator('contentList[0].picUrl', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[0].picUrl
                  : ''
              })(<UploadImg style={{ width: '300px', height: '75px' }} />)}
            </Form.Item>
            <Form.Item label="豆腐块1链接">
              {getFieldDecorator('contentList[0].actionUrl', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[0].actionUrl
                  : ''
              })(<LinkGenerPro />)}
            </Form.Item>
          </Card>
          <Card title="豆腐块2" style={cardStyle}>
            <Form.Item label="豆腐块2图片">
              {getFieldDecorator('contentList[1].picUrl', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[1].picUrl
                  : ''
              })(<UploadImg style={{ width: '300px', height: '75px' }} />)}
            </Form.Item>
            <Form.Item label="豆腐块2链接">
              {getFieldDecorator('contentList[1].actionUrl', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[1].actionUrl
                  : ''
              })(<LinkGenerPro />)}
            </Form.Item>
          </Card>
          <Card title="豆腐块3" style={cardStyle}>
            <Form.Item label="豆腐块3图片">
              {getFieldDecorator('contentList[2].picUrl', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[2].picUrl
                  : ''
              })(<UploadImg style={{ width: '300px', height: '75px' }} />)}
            </Form.Item>
            <Form.Item label="豆腐块3链接">
              {getFieldDecorator('contentList[2].actionUrl', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[2].actionUrl
                  : ''
              })(<LinkGenerPro />)}
            </Form.Item>
          </Card>
        </Form>
      </div>
    );
  }
}
