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
    dataSource2: [],
    index1: 0,
    index2: 0
  };
  componentDidMount() {
    const data = this.props.content.contentList;
    if (data && data[0]) {
      this.setState({
        dataSource1: data[0].carItemList
      });
    }
    if (data && data[1]) {
      this.setState({
        dataSource2: data[1].carItemList
      });
    }
  }
  handleSave = () => {
    const { dataSource1, dataSource2 } = this.state;

    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const data = {
          ...values,
          contentList: [
            {
              carItemList: dataSource1
            }
          ]
        };
        // if (flag2) {

        // }
        data.contentList.push({ carItemList: dataSource2 });
        this.props.onChange(data);
      }
    });

    // let flag1 = true;
    // let flag2 = true;
    // if (dataSource1.length >= 0) {
    //   flag1 = dataSource1.length === 0 ? false : true;
    //   dataSource1.forEach(item => {
    //     if (item.showType === '' || !item.showType) {
    //       flag1 = false;
    //     }
    //     if (!item.id) {
    //       flag1 = false;
    //     }
    //   });
    // }
    // if (dataSource2.length >= 0) {
    //   flag2 = dataSource2.length === 0 ? false : true;
    //   dataSource2.forEach(item => {
    //     if (item.showType === '' || !item.showType) {
    //       flag2 = false;
    //     }
    //     if (!item.id) {
    //       flag2 = false;
    //     }
    //   });
    // }
    // if (flag1 || flag2) {

    // } else {
    //   // tslint:disable-next-line:no-console
    //   console.log(23);
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
    const { dataSource1, index1, dataSource2, index2 } = this.state;
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
    dataSource2.push({
      key: index2,
      showType: '1'
    });
    this.setState({
      dataSource2,
      index: index2 + 1
    });
  }
  handleDeleteBanner = (flag, index) => {
    const { dataSource1, dataSource2 } = this.state;
    if (flag) {
      dataSource1.splice(index, 1);
      this.setState({
        dataSource1
      });
      return false;
    }
    dataSource2.splice(index, 1);
    this.setState({
      dataSource2
    });
  };
  handleCarStyleChange = (flag, e, index) => {
    const { dataSource1, dataSource2 } = this.state;
    if (flag) {
      dataSource1[index].showType = e.target.value;
      this.setState({
        dataSource1
      });
      return false;
    }
    dataSource2[index].showType = e.target.value;
    this.setState({
      dataSource2
    });
  };
  hadndleIdChange = (flag, index, value) => {
    const { dataSource1, dataSource2 } = this.state;
    if (flag && value) {
      dataSource1[index].id = value;
      this.setState({
        dataSource1
      });
      return false;
    }
    dataSource2[index].id = value;
    this.setState({
      dataSource2
    });
  };
  handleTitleChange = (flag, e, index) => {
    const { dataSource1, dataSource2 } = this.state;
    const value = e.target.value;
    if (flag) {
      dataSource1[index].copywriting = value;
      this.setState({
        dataSource1
      });
      return false;
    }
    dataSource2[index].copywriting = e.target.value;
    this.setState({
      dataSource2
    });
  };
  handleLinkChange = (flag, value, index) => {
    const { dataSource1, dataSource2 } = this.state;
    const arr = value.split('?param=');
    let json: any = arr[1];
    json = JSON.parse(decodeURIComponent(json));
    let  trackValue = undefined;
    if (flag) {
      trackValue  = dataSource1[index].trackValue ;
    } else {
      trackValue  = dataSource2[index].trackValue ;
    }
    // tslint:disable-next-line:no-console
    console.log(trackValue);
    if (trackValue) {
      json.trackValue = trackValue;
    }
    const val = `${arr[0]}?param=${encodeURIComponent(JSON.stringify(json))}`;
    if (flag && value) {
      dataSource1[index].actionUrl = val;
      dataSource1[index].id = json.id;
      this.setState({
        dataSource1
      });
      return false;
    }
    dataSource2[index].actionUrl = val;
    dataSource2[index].id = json.id;
    this.setState({
      dataSource2
    });
  };
  handleTrackValueChange = (flag, e, index) => {
    const { dataSource1, dataSource2 } = this.state;
    const value = e.target.value;
    const vvvv = flag ? dataSource1[index].actionUrl : dataSource2[index].actionUrl;
    const arr = vvvv.split('?param=');
    let json: any = arr[1];
    json = JSON.parse(decodeURIComponent(json));
    if (value) {
      json.trackValue = value;
    }
    const val = `${arr[0]}?param=${encodeURIComponent(JSON.stringify(json))}`;
    if (flag) {
      dataSource1[index].trackValue = value;
      dataSource1[index].actionUrl = val;
      this.setState({
        dataSource1
      });
      return false;
    }
    dataSource2[index].trackValue = value;
    dataSource2[index].actionUrl = val;
    this.setState({
      dataSource2
    });
  };
  render() {
    const headProps = {
      title: '导购栏样式5',
      onSave: this.handleSave,
      onReset: this.handleReset,
      onRemove: this.handleRemove
    };
    const cardStyle = {
      marginTop: '20px'
    };
    const { getFieldDecorator } = this.props.form;
    const { dataSource1, dataSource2 } = this.state;
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
              message="请上传格式为png或gif的图片，尺寸690px*150px"
              type="info"
              showIcon
            />
          </Form.Item>
          <Form.Item label="链接">
            {getFieldDecorator('contentInfo.actionUrl', {
              initialValue: this.props.content.contentInfo
                ? this.props.content.contentInfo.actionUrl
                : ''
            })(
            <LinkGenerPro
              isShowTrackValue={false}
              // onChange
            />)}
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
              新增第一行车辆
            </Button>
          </div>
          {dataSource1.length > 0 ? (
            dataSource1.map((item, index) => (
              <Card
                key={index}
                title={`第一行车辆${index + 1}`}
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
                        src={require('./carStyle2.png')}
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
          <div>
            <Button
              type="primary"
              onClick={() => this.handleAddRowCar(false)}
              style={{ marginTop: '20px' }}
            >
              新增第二行车辆
            </Button>
          </div>
          {dataSource2.length > 0 ? (
            dataSource2.map((item, index) => (
              <Card
                key={index}
                title={`第二行车辆${index + 1}`}
                style={cardStyle}
                extra={
                  <Icon
                    type="close"
                    style={{
                      color: 'red',
                      fontSize: '20px',
                      cursor: 'pointer'
                    }}
                    onClick={() => this.handleDeleteBanner(false, index)}
                  />
                }
              >
                <Form.Item label="*车辆样式">
                  <RadioGroup
                    value={
                      dataSource2[index].showType
                        ? dataSource2[index].showType.toString()
                        : '1'
                    }
                    onChange={e => this.handleCarStyleChange(false, e, index)}
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
                        src={require('./carStyle2.png')}
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
                    onChange={value =>
                      this.hadndleIdChange(false, index, value)
                    }
                    value={dataSource2[index].id ? dataSource2[index].id : ''}
                  />
                </Form.Item> */}
                {dataSource2[index].showType &&
                dataSource2[index].showType.toString() === '2' ? (
                  <Form.Item label="营销文案">
                    <Input
                      onChange={e => this.handleTitleChange(false, e, index)}
                      value={
                        dataSource2[index].copywriting
                          ? dataSource2[index].copywriting
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
                      this.handleLinkChange(false, value, index)
                    }
                    value={
                      dataSource2[index].actionUrl
                        ? dataSource2[index].actionUrl
                        : ''
                    }
                  />
                </Form.Item>
                <Form.Item label="打点值">
                  <Input
                    onChange={e => this.handleTrackValueChange(false, e, index)}
                    value={
                      dataSource2[index].trackValue
                        ? dataSource2[index].trackValue
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
