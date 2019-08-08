import React from 'react';
import BaseProps from 'src/declare/baseProps';
import {
  Form,
  Input,
  Card,
  Alert,
  Button,
  Icon,
  message,
  Radio,
  InputNumber
} from 'antd';
import UploadImg from '../../UploadImg';
import { EditViewProps } from 'src/components/homeLib/Base';
import LinkGenerPro from 'src/components/LinkgenerPro';
import BaseHead from 'src/components/homeLib/BaseHead';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@(Form.create as any)()
export default class EditView extends React.Component<EditViewProps> {
  state = {
    dataSource1: [],
    index1: 0
  };
  componentDidMount() {
    const data = this.props.content.contentInfo;
    if (data && data.carItemList) {
      this.setState({
        dataSource1: data.carItemList
      });
    }
  }
  handleSave = () => {
    const { dataSource1 } = this.state;
    // let flag1 = true;
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        values.contentInfo.carItemList = dataSource1;
        this.props.onChange(values);
      }
    });

    // if (dataSource1.length >= 0) {
    //   flag1 = dataSource1.length === 0 ? false : true;
    //   dataSource1.forEach(item => {
    //     if (item.showType === '' || !item.showType) {
    //       flag1 = false;
    //     }
    //     if (item.actionUrl) {
    //       const json = JSON.parse(decodeURIComponent(item.actionUrl.split('?param=')[1]));
    //       if (!json.id) {
    //         flag1 = false;
    //       }
    //     } else {
    //       flag1 = false;
    //     }
    //   });
    // }
    // if (flag1) {

    // } else {
    //   message.error('请填写车辆表单信息');
    // }
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  handleRemove = () => {
    this.props.onRemove(this.props.index, this.props.id);
  };
  handleAddRowCar(flag) {
    const { dataSource1, index1 } = this.state;
    if (flag) {
      dataSource1.push({
        key: index1,
        showType: '1'
      });
      this.setState({
        dataSource1,
        index: index1 + 1
      });
      return false;
    }
  }
  handleDeleteBanner = (flag, index) => {
    const { dataSource1 } = this.state;
    if (flag) {
      dataSource1.splice(index, 1);
      this.setState({
        dataSource1
      });
      return false;
    }
  };
  handleCarStyleChange = (flag, e, index) => {
    const { dataSource1 } = this.state;
    if (flag && e.target.value) {
      dataSource1[index].showType = e.target.value;
      this.setState({
        dataSource1
      });
      return false;
    }
  };

  hadndleIdChange = (flag, index, value) => {
    const { dataSource1 } = this.state;
    if (flag && value) {
      dataSource1[index].id = value;
      this.setState({
        dataSource1
      });
      return false;
    }
  };
  handleTitleChange = (flag, e, index) => {
    const { dataSource1 } = this.state;
    const value = e.target.value;
    if (flag) {
      dataSource1[index].copywriting = value;
      this.setState({
        dataSource1
      });
      return false;
    }
  };
  handleLinkChange = (flag, value, index) => {
    const { dataSource1 } = this.state;
    if (flag && value) {
      dataSource1[index].actionUrl = value;
      this.setState({
        dataSource1
      });
      return false;
    }
  };
  handleTrackValueChange = (flag, e, index) => {
    const { dataSource1 } = this.state;
    const value = e.target.value;
    if (flag && value) {
      dataSource1[index].trackValue = value;
      this.setState({
        dataSource1
      });
      return false;
    }
  };
  render() {
    const headProps = {
      title: '导购栏样式6',
      onSave: this.handleSave,
      onReset: this.handleReset,
      onRemove: this.handleRemove
    };
    const cardStyle = {
      marginTop: '20px'
    };
    const { dataSource1 } = this.state;
    const { getFieldDecorator } = this.props.form;
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
                width={690}
                height={150}
                style={{ width: '345px', height: '75px' }}
              />
            )}
            <Alert
              message="请上传格式为png或jpg的图片，尺寸690px*150px"
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
            })(<Input placeholder="请输入打点值" />)}
          </Form.Item>
          <div>
            <Button type="primary" onClick={() => this.handleAddRowCar(true)}>
              增加车辆
            </Button>
          </div>
          {dataSource1.length > 0 ? (
            dataSource1.map((item, index) => (
              <Card
                key={index}
                title={`车辆${index + 1}`}
                style={cardStyle}
                extra={
                  <Icon
                    type="close"
                    style={{
                      color: 'red',
                      fontSize: '20px',
                      cursor: 'pointer'
                    }}
                    onClick={() => this.handleDeleteBanner(true, index)}
                  />
                }
              >
                <Form.Item label="*车辆样式">
                  <RadioGroup
                    value={
                      dataSource1[index].showType
                        ? dataSource1[index].showType.toString()
                        : '1'
                    }
                    onChange={e => this.handleCarStyleChange(true, e, index)}
                  >
                    <Radio value="1">
                      <img
                        src={require('./carStyle1.png')}
                        alt=""
                        width="100"
                        height="100"
                      />
                    </Radio>
                    <Radio value="2">
                      <img
                        src={require('./carStyle1.png')}
                        alt=""
                        width="100"
                        height="100"
                      />
                    </Radio>
                  </RadioGroup>
                </Form.Item>
                {/* <Form.Item label="*ID">
                  <InputNumber
                    precision={0}
                    min={0}
                    onChange={value => this.hadndleIdChange(true, index, value)}
                    value={dataSource1[index].id ? dataSource1[index].id : ''}
                  />
                </Form.Item> */}
                {dataSource1[index].showType &&
                dataSource1[index].showType.toString() === '2' ? (
                  <Form.Item label="营销文案">
                    <Input
                      onChange={e => this.handleTitleChange(true, e, index)}
                      value={
                        dataSource1[index].copywriting
                          ? dataSource1[index].copywriting
                          : ''
                      }
                    />
                  </Form.Item>
                ) : null}
                <Form.Item label="链接">
                  <LinkGenerPro
                    isOnlyCars
                    isShowTrackValue={false}
                    onChange={value =>
                      this.handleLinkChange(true, value, index)
                    }
                    value={
                      dataSource1[index].actionUrl
                        ? dataSource1[index].actionUrl
                        : ''
                    }
                  />
                </Form.Item>
                <Form.Item label="打点值">
                  <Input
                    onChange={e => this.handleTrackValueChange(true, e, index)}
                    value={
                      dataSource1[index].trackValue
                        ? dataSource1[index].trackValue
                        : ''
                    }
                  />
                </Form.Item>
              </Card>
            ))
          ) : (
            <p>暂无车辆数据</p>
          )}
        </Form>
      </div>
    );
  }
}
