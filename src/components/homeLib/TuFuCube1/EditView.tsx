import React from 'react';
import BaseProps from 'src/declare/baseProps';
import { Form, Input, Card, Alert, InputNumber } from 'antd';
import UploadImg from '../../UploadImg';
import { EditViewProps } from 'src/components/homeLib/Base';
import LinkGenerPro from 'src/components/LinkgenerPro';
import BaseHead from 'src/components/homeLib/BaseHead';

function compare(property) {
  return function (a, b) {
    const value1 = a[property];
    const value2 = b[property];
    return value1 - value2;
  };
}

@(Form.create as any)()
export default class EditView extends React.Component<EditViewProps> {
  handleSave = () => {
    this.props.form.validateFields({ force: true }, async (err, values) => {
      if (!err) {
        values.contentList.sort(compare('sort'));
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
      title: '4个豆腐块',
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
            <Form.Item label="豆腐块1名称">
              {getFieldDecorator('contentList[0].title', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[0].title
                  : ''
              })(<Input />)}
            </Form.Item>
            <Form.Item label="豆腐块1图片">
              {getFieldDecorator('contentList[0].iconUrl', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[0].iconUrl
                  : ''
              })(
                <UploadImg
                  width={187}
                  height={136}
                  style={{ width: '187px', height: '136px' }}
                />
              )}
              <Alert
                message="格式为png或gif，尺寸为187px*136px"
                type="info"
                showIcon
              />
            </Form.Item>
            <Form.Item label="豆腐块1打点值">
              {getFieldDecorator('contentList[0].trackValue', {
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[0].trackValue
                  : ''
              })(<Input />)}
            </Form.Item>
            <Form.Item label="豆腐块1链接">
              {getFieldDecorator('contentList[0].actionUrl', {
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[0].actionUrl
                  : ''
              })(<LinkGenerPro />)}
            </Form.Item>
            <Form.Item label="豆腐块1排序">
              {getFieldDecorator('contentList[0].sort', {
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[0].sort
                  : ''
              })(<InputNumber precision={0} min={1} />)}
            </Form.Item>
          </Card>
          <Card title="豆腐块2" style={cardStyle}>
            <Form.Item label="豆腐块2名称">
              {getFieldDecorator('contentList[1].title', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[1].title
                  : ''
              })(<Input />)}
            </Form.Item>
            <Form.Item label="豆腐块2图片">
              {getFieldDecorator('contentList[1].iconUrl', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[1].iconUrl
                  : ''
              })(
                <UploadImg
                  width={187}
                  height={136}
                  style={{ width: '187px', height: '136px' }}
                />
              )}
              <Alert
                message="格式为png或gif，尺寸为187px*136px"
                type="info"
                showIcon
              />
            </Form.Item>
            <Form.Item label="豆腐块2打点值">
              {getFieldDecorator('contentList[1].trackValue', {
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[1].trackValue
                  : ''
              })(<Input />)}
            </Form.Item>
            <Form.Item label="豆腐块2链接">
              {getFieldDecorator('contentList[1].actionUrl', {
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[1].actionUrl
                  : ''
              })(<LinkGenerPro />)}
            </Form.Item>
            <Form.Item label="豆腐块2排序">
              {getFieldDecorator('contentList[1].sort', {
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[1].sort
                  : ''
              })(<InputNumber precision={0} min={1} />)}
            </Form.Item>
          </Card>
          <Card title="豆腐块3" style={cardStyle}>
            <Form.Item label="豆腐块3名称">
              {getFieldDecorator('contentList[2].title', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[2].title
                  : ''
              })(<Input />)}
            </Form.Item>
            <Form.Item label="豆腐块3图片">
              {getFieldDecorator('contentList[2].iconUrl', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[2].iconUrl
                  : ''
              })(
                <UploadImg
                  width={187}
                  height={136}
                  style={{ width: '187px', height: '136px' }}
                />
              )}
              <Alert
                message="格式为png或gif，尺寸为187px*136px"
                type="info"
                showIcon
              />
            </Form.Item>
            <Form.Item label="豆腐块3打点值">
              {getFieldDecorator('contentList[2].trackValue', {
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[2].trackValue
                  : ''
              })(<Input />)}
            </Form.Item>
            <Form.Item label="豆腐块3链接">
              {getFieldDecorator('contentList[2].actionUrl', {
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[2].actionUrl
                  : ''
              })(<LinkGenerPro />)}
            </Form.Item>
            <Form.Item label="豆腐块3排序">
              {getFieldDecorator('contentList[2].sort', {
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[2].sort
                  : ''
              })(<InputNumber precision={0} min={1} />)}
            </Form.Item>
          </Card>
          <Card title="豆腐块4" style={cardStyle}>
            <Form.Item label="豆腐块4名称">
              {getFieldDecorator('contentList[3].title', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[3].title
                  : ''
              })(<Input />)}
            </Form.Item>
            <Form.Item label="豆腐块4图片">
              {getFieldDecorator('contentList[3].iconUrl', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[3].iconUrl
                  : ''
              })(
                <UploadImg
                  width={187}
                  height={136}
                  style={{ width: '187px', height: '136px' }}
                />
              )}
              <Alert
                message="格式为png或gif，尺寸为187px*136px"
                type="info"
                showIcon
              />
            </Form.Item>
            <Form.Item label="豆腐块4打点值">
              {getFieldDecorator('contentList[3].trackValue', {
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[3].trackValue
                  : ''
              })(<Input />)}
            </Form.Item>
            <Form.Item label="豆腐块4链接">
              {getFieldDecorator('contentList[3].actionUrl', {
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[3].actionUrl
                  : ''
              })(<LinkGenerPro />)}
            </Form.Item>
            <Form.Item label="豆腐块4排序">
              {getFieldDecorator('contentList[3].sort', {
                initialValue: this.props.content.contentList
                  ? this.props.content.contentList[3].sort
                  : ''
              })(<InputNumber precision={0} min={1} />)}
            </Form.Item>
          </Card>
        </Form>
      </div>
    );
  }
}
