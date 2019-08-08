import React from 'react';
import BaseProps from 'src/declare/baseProps';
import { Form, Input, Card, Alert } from 'antd';
import UploadImg from '../../UploadImg';
import { EditViewProps } from 'src/components/homeLib/Base';
import LinkGenerPro from 'src/components/LinkgenerPro';
import BaseHead from 'src/components/homeLib/BaseHead';
import styles from '../HomeSearch/styles.less';
import Colorful from 'src/components/Colorful';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 16 },
  }
};

@(Form.create as any)()
export default class EditView extends React.Component <EditViewProps> {
  handleSave = () => {
    //
    this.props.form.validateFields({ force: true }, async (err, { list, color }) => {
      const data = {
        color,
        contentList: list,
      };
      if (!err) {
        this.props.onChange(data, this.props.index);
      }
    });
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  handleRemove = () => {
    this.props.onRemove(this.props.index, this.props.id);
  }

  getFormItem = () => {

    const { getFieldDecorator } = this.props.form;

    let  content = Array(4).fill({ name: '', selectIcon: '', unselectIcon: ' ' });
    if (this.props.content.contentList && this.props.content.contentList.length) {
      content = this.props.content.contentList;
    }
    return(

      content && content.length > 0 ? content.map((item, index) => {
        return (
          <div key={index}  className={styles.box} >
            <FormItem {...formItemLayout} label="名称">
              {getFieldDecorator(`list[${index}].name`, {
                rules: [{ required: true, message: '请输入名称' }],
                initialValue: item.name
              })(<Input placeholder="请输入名称" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="选中">
              {getFieldDecorator(`list[${index}].selectIcon`, {
                rules: [{ required: true, message: '请上传选中图标' }],
                initialValue: item.selectIcon
              })(<UploadImg  style={{ maxWidth: '100px', maxHeight: '100px' }} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="未选中">
              {getFieldDecorator(`list[${index}].unselectIcon`, {
                rules: [{ required: true, message: '请上传未选中图标' }],
                initialValue: item.unselectIcon
              })(<UploadImg  style={{ maxWidth: '100px', maxHeight: '100px' }} />
              )}
            </FormItem>
          </div >
        );
      }) : ''
    );

  }

  render() {

    const headProps = {
      title: '首页底部Tabs',
      onSave: this.handleSave,
      onReset: this.handleReset
    };
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <BaseHead  {...headProps}  />
        <Form hideRequiredMark>
          {this.getFormItem()}
          <div  className={styles.box} >
          <FormItem {...formItemLayout} label="Tab选中颜色">
              {getFieldDecorator(`color`, {
                rules: [{ required: true, message: '请上传未选中图标' }],
                initialValue: this.props.content.color || '255,255,255,1'
              })(<Colorful layout="rigthTop" style={{ paddingTop: `5px` }} />
              )}
            </FormItem>
            </div>
        </Form>
      </div>
    );
  }
}
