import React from 'react';
import BaseProps from 'src/declare/baseProps';
import { Form, Input, Card, Alert } from 'antd';
import UploadImg from '../../UploadImg';
import { EditViewProps } from 'src/components/homeLib/Base';
import LinkGenerPro from 'src/components/LinkgenerPro';
import BaseHead from 'src/components/homeLib/BaseHead';
@(Form.create as any)()
export default class EditView extends React.Component<EditViewProps> {
  state = {
    imgWidth: '',
    imgHeight: ''
  };
  componentDidMount() {
    const data = this.props.content.contentInfo;
    if (data) {
      this.setState({
        imgWidth: data.width,
        imgHeight: data.height
      });
    }
  }
  handleSave = () => {
    this.props.form.validateFields({ force: true }, async (err, values) => {
      if (!err) {
        const { imgWidth, imgHeight } = this.state;
        values.contentInfo.width = imgWidth;
        values.contentInfo.height = imgHeight;
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
  handleGetImgAttr = value => {
    this.setState({
      imgWidth: value.width,
      imgHeight: value.height
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const headProps = {
      title: '图片',
      onSave: this.handleSave,
      onReset: this.handleReset,
      onRemove: this.handleRemove
    };
    return (
      <div>
        <BaseHead {...headProps} />
        <Form>
          <Form.Item label="标题">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '必填项' }],
              initialValue: this.props.content ? this.props.content.title : ''
            })(<Input placeholder="请输入标题" />)}
          </Form.Item>
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
                onImgAttr={value => this.handleGetImgAttr(value)}
              />
            )}
            <Alert message="格式为png或gif,宽度为750px" type="info" showIcon />
          </Form.Item>
          {/* <Form.Item label="链接">
            {getFieldDecorator('contentInfo.actionUrl', {
              // rules: [{ required: true, message: '必填项' }],
              initialValue: this.props.content.contentInfo
                ? this.props.content.contentInfo.actionUrl
                : ''
            })(<LinkGenerPro />)}
          </Form.Item> */}
        </Form>
      </div>
    );
  }
}
