import React from 'react';
import BaseProps from 'src/declare/baseProps';
import { Form, Input, Card, Alert, Button, Badge } from 'antd';
import UploadImg from '../../UploadImg';
import { EditViewProps } from 'src/components/homeLib/Base';
import LinkGenerPro from 'src/components/LinkgenerPro';
import BaseHead from 'src/components/homeLib/BaseHead';
import styles from './styles.less';

const FormItem = Form.Item;
@(Form.create as any)()
export default class EditView extends React.Component <EditViewProps> {

  state = { content: { hotSearch: []  } };
  handleSave = () => {
    this.props.onChange(this.state.content, this.props.index);
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  handleRemove = (index) => {
    this.state.content.hotSearch.splice(index, 1);
    this.setState({});
  }

  componentWillMount() {
    //
    // const content = {
    //   keyword: 'XX',
    //   actionUrl: 'xxxx',
    //   // key: new Date().getTime(),
    //   hotSearch: [
    //     {
    //       name: 'XXXX',
    //       actionUrl: 'xxxx',
    //       trackValue
    //     }, {
    //       name: 'XXXX',
    //       actionUrl: 'xxxx',
    //     }
    //   ]
    // };

    this.setState({
      content: {
        ...this.props.content
      }
    });
  }

  handleClick = () => {
    if (!this.state.content.hotSearch) {
      this.state.content.hotSearch = [];
    }
    this.state.content.hotSearch.push({ name: '', actionUrl: '', trackValue: '' });
    this.setState({});
  }

  getBtn = (index) => {
    return (
      <Button
        type="primary"
        icon="close"
        onClick={() => {
          this.handleRemove(index);
        }}
        style={{
          position: 'absolute',
          right: '0px',
          top: '15px',
          height: '22px',
          width: '22px',
          padding: 0,
          zIndex: 1000
        }}
      />

    );
  }

  handleChange = (e, index, prop) => {
    let value = '';
    if (prop === 'actionUrl') {
      value = e;
    } else {
      value = e.target.value;
    }

    if (index !== undefined) {
      this.state.content.hotSearch[index][prop] = value;
    } else {
      this.state.content[prop] = value;
    }

    this.setState({});
  }

  getFormItem = (getFieldDecorator, content, index?) => {
    let pro = 'keyword';
    let labelName = '关键字';
    const styleCustom = { borderBottom: '1px solid rgb(193, 193, 193)' };

    if (index !== undefined) {
      pro = 'name';
      labelName = `热门搜索${index + 1}`;
    }

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

    return (
      <div key={index}  className={styles.box} style={styleCustom} >
        {index !== undefined ?  this.getBtn(index) : ''}

        <FormItem {...formItemLayout} label={labelName}>
          <Input onChange={(e) => this.handleChange(e, index, pro)} value={content.keyword || content.name} />
        </FormItem>
        {index !== undefined ? (<FormItem {...formItemLayout} label={'打点值'}>
        <Input onChange={(v) => { this.handleChange(v, index, 'trackValue'); }} value={content.trackValue} />
        </FormItem>) : ''}

        <FormItem {...formItemLayout} label={'链接'}>
          <LinkGenerPro
            onChange={(v) => { this.handleChange(v, index, 'actionUrl'); }}
            value={content.actionUrl}
          />
        </FormItem>
      </div >
    );

  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const { hotSearch } = this.state.content;
    const headProps = {
      title: '首页搜索栏',
      onSave: this.handleSave,
      onReset: this.handleReset,
      // onRemove: this.handleRemove
    };

    return (
      <div>
        <BaseHead  {...headProps}  />
        <Form hideRequiredMark>
          {this.getFormItem(getFieldDecorator, this.state.content)}

          {hotSearch && hotSearch.length > 0 ? hotSearch.map((item, index) => {
            return this.getFormItem(getFieldDecorator, item, index);
          }) : ''}

          <div
            className={styles.cardItem}
            style={{ padding: '10px', marginBottom: '20px' }}
          >
            <Button
              title={'添加热门搜索'}
              icon="plus"
              type="dashed"
              style={{ width: '100%', height: '100%', cursor: 'pointer' }}
              onClick={this.handleClick}
              className={styles.addBtn}
            />
          </div>

        </Form>
      </div>
    );
  }
}
