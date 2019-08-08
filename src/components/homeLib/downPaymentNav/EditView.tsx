import React from 'react';
import BaseProps from 'src/declare/baseProps';
import { Form, Input, Card, Alert } from 'antd';
import UploadImg from '../../UploadImg';
import { EditViewProps } from 'src/components/homeLib/Base';
import LinkGenerPro from 'src/components/LinkgenerPro';
import BaseHead from 'src/components/homeLib/BaseHead';
import _ from 'lodash';

@(Form.create as any)()
export default class EditView extends React.Component<EditViewProps> {
  handleSave = () => {
    this.props.form.validateFields({ force: true }, async (err, values) => {
      const value = _.cloneDeep(values);
      if (!err) {
        value.contentList.sort((a, b) => {
          return a.sort - b.sort;
        });
        this.props.onChange(value);
      }
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  handleRemove = () => {
    this.props.onRemove(this.props.index, this.props.id);
  };
  getFormItem = (info, index) => {
    const { getFieldDecorator } = this.props.form;
    return(
      <Card key={index} title={`首付${index + 1}`} style={{ marginTop: '20px' }}>
            <Form.Item label={`首付${index + 1}名称`}>
              {getFieldDecorator(`contentList[${index}].title`, {
                rules: [{ required: true, message: '必填项' }],
                initialValue: info.title
              })(<Input />)}
            </Form.Item>

            <Form.Item label={`首付${index + 1}打点值`}>
              {getFieldDecorator(`contentList[${index}].trackValue`, {
                rules: [{ required: false, message: '必填项' }],
                initialValue: info.trackValue
              })(<Input />)}
            </Form.Item>

            <Form.Item label={`首付${index + 1}链接`}>
              {getFieldDecorator(`contentList[${index}].actionUrl`, {
                rules: [{ required: false, message: '必填项' }],
                initialValue: info.actionUrl
              })(<LinkGenerPro isShowTrackValue={false} />)}
            </Form.Item>
            <Form.Item label={`首付${index + 1}排序`}>
              {getFieldDecorator(`contentList[${index}].sort`, {
                rules: [{ required: false, message: '必填项' }],
                initialValue: info.sort
              })(<Input />)}
            </Form.Item>
          </Card>
    );
  };
  render() {
    const headProps = {
      title: '首付价格导航栏',
      onSave: this.handleSave,
      onReset: this.handleReset,
      onRemove: this.handleRemove
    };
    const labelStyle = {
      labelCol: { span: 4 },
      wrapperCol: { span: 19, push: 1 }
    };
    let contentList = [];
    if (this.props.content.contentList && this.props.content.contentList.length > 0) {
      contentList = this.props.content.contentList;
    } else {
      contentList = Array(4).fill({
        title : 	'',
        actionUrl :  '',
        sort :  '',
      });
    }
    return (
      <div>
        <BaseHead {...headProps} />
        <Form>
          {contentList.map((item, index) => { return this.getFormItem(item, index);  })}
        </Form>
      </div>
    );
  }
}
