import React from 'react';
import BaseProps from 'src/declare/baseProps';
import { Form, Input, Card, Alert, Radio, DatePicker, InputNumber } from 'antd';
import UploadImg from '../../UploadImg';
import { EditViewProps } from 'src/components/homeLib/Base';
import LinkGenerPro from 'src/components/LinkgenerPro';
import BaseHead from 'src/components/homeLib/BaseHead';
import moment from 'moment';
import { format } from 'url';
import _ from 'lodash';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@(Form.create as any)()
export default class EditView extends React.Component<EditViewProps> {
  state = {
    imgWidth: '',
    imgHeight: '',
    startTime: ''
  };
  componentDidMount() {
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const data = this.props.content.contentInfo;
    if (data) {
      this.setState({
        imgWidth: data.width,
        height: data.height
      });
    }
  }
  handleSave = () => {
    this.props.form.validateFields({ force: true }, async (err, values) => {
      if (!err) {
        const { imgWidth, imgHeight } = this.state;
        values.contentInfo.marketInfo.startTime = moment(
          values.contentInfo.marketInfo.startTime
        ).format('x');
        values.contentInfo.marketInfo.endTime = moment(
          values.contentInfo.marketInfo.endTime
        ).format('x');
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
      title: '活动导航栏带倒计时',
      onSave: this.handleSave,
      onReset: this.handleReset,
      onRemove: this.handleRemove
    };
    const labelStyle = {
      labelCol: { span: 4 },
      wrapperCol: { span: 19, push: 1 }
    };
    const cardStyle = {
      marginBottom: '30px'
    };
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    return (
      <div>
        <BaseHead {...headProps} />
        <Form>
          <Card style={cardStyle} title="时间参数">
            <Form.Item label="活动开始时间">
              {getFieldDecorator('contentInfo.marketInfo.startTime', {
                initialValue: this.props.content.contentInfo
                  ? moment(
                      _.toNumber(
                        this.props.content.contentInfo.marketInfo.startTime
                      )
                    )
                  : '',
                rules: [{ required: true, message: '必填项' }]
              })(
                <DatePicker
                  showTime
                  format={dateFormat}
                  style={{ width: '200px' }}
                />
              )}
            </Form.Item>
            <Form.Item label="活动结束时间">
              {getFieldDecorator('contentInfo.marketInfo.endTime', {
                initialValue: this.props.content.contentInfo
                  ? moment(
                      _.toNumber(
                        this.props.content.contentInfo.marketInfo.endTime
                      )
                    )
                  : '',
                rules: [{ required: true, message: '必填项' }]
              })(
                <DatePicker
                  showTime
                  format={dateFormat}
                  style={{ width: '200px' }}
                />
              )}
            </Form.Item>
          </Card>
          <Card style={cardStyle} title="活动前参数">
            <Form.Item label="活动前图片">
              {getFieldDecorator('contentInfo.marketInfo.beforeImgUrl', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentInfo
                  ? this.props.content.contentInfo.marketInfo.beforeImgUrl
                  : ''
              })(
                <UploadImg
                  width={750}
                  style={{ width: '94px', height: '62px' }}
                  onImgAttr={value => this.handleGetImgAttr(value)}
                />
              )}
              <Alert
                message="格式为png或gif，宽度为750px"
                type="info"
                showIcon
              />
            </Form.Item>
            <Form.Item label="活动前链接">
              {getFieldDecorator('contentInfo.marketInfo.beforeActionUrl', {
                initialValue: this.props.content.contentInfo
                  ? this.props.content.contentInfo.marketInfo.beforeActionUrl
                  : ''
              })(<LinkGenerPro />)}
            </Form.Item>
          </Card>
          <Card style={cardStyle} title="活动中参数">
            <Form.Item label="活动中图片">
              {getFieldDecorator('contentInfo.marketInfo.ingImgUrl', {
                rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentInfo
                  ? this.props.content.contentInfo.marketInfo.ingImgUrl
                  : ''
              })(
                <UploadImg
                  width={750}
                  style={{ width: '94px', height: '62px' }}
                  onImgAttr={value => this.handleGetImgAttr(value)}
                />
              )}
              <Alert
                message="格式为png或gif，宽度为750px"
                type="info"
                showIcon
              />
            </Form.Item>
            <Form.Item label="活动中链接">
              {getFieldDecorator('contentInfo.marketInfo.ingActionUrl', {
                initialValue: this.props.content.contentInfo
                  ? this.props.content.contentInfo.marketInfo.ingActionUrl
                  : ''
              })(<LinkGenerPro />)}
            </Form.Item>
          </Card>
          <Card style={cardStyle} title="活动后参数">
            <Form.Item label="活动后图片">
              {getFieldDecorator('contentInfo.marketInfo.afterImgUrl', {
                // rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentInfo
                  ? this.props.content.contentInfo.marketInfo.afterImgUrl
                  : ''
              })(
                <UploadImg
                  width={750}
                  style={{ width: '94px', height: '62px' }}
                  onImgAttr={value => this.handleGetImgAttr(value)}
                />
              )}
              <Alert
                message="格式为png或gif，宽度为750px"
                type="info"
                showIcon
              />
            </Form.Item>
            <Form.Item label="活动后链接">
              {getFieldDecorator('contentInfo.marketInfo.afterActionUrl', {
                // rules: [{ required: true, message: '必填项' }],
                initialValue: this.props.content.contentInfo
                  ? this.props.content.contentInfo.marketInfo.afterActionUrl
                  : ''
              })(<LinkGenerPro />)}
            </Form.Item>
          </Card>
          <Card style={cardStyle} title="打点值参数">
            <Form.Item label="打点值">
              {getFieldDecorator('contentInfo.marketInfo.trackValue', {
                initialValue: this.props.content.contentInfo
                  ? this.props.content.contentInfo.marketInfo.trackValue
                  : ''
              })(<Input />)}
            </Form.Item>
          </Card>
        </Form>
      </div>
    );
  }
}
