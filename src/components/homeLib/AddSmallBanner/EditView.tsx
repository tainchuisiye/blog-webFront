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
  InputNumber
} from 'antd';
import UploadImg from '../../UploadImg';
import { EditViewProps } from 'src/components/homeLib/Base';
import LinkGenerPro from 'src/components/LinkgenerPro';
import BaseHead from 'src/components/homeLib/BaseHead';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import View from '../../../pages/homeConfig/View';
function compare(property) {
  return function (a, b) {
    const value1 = a[property];
    const value2 = b[property];
    return value1 - value2;
  };
}

@(Form.create as any)()
export default class EditView extends React.Component<EditViewProps> {
  state = {
    dataSource: [],
    index: 0
  };
  componentDidMount() {
    const dataSource = this.props.content.contentList;
    if (dataSource) {
      this.setState({
        dataSource
      });
    }
  }
  handleSave = () => {
    const { dataSource } = this.state;
    let flag = true;
    dataSource.forEach(item => {
      if (item.picUrl === '' || !item.picUrl) {
        flag = false;
      }
    });
    if (flag) {
      dataSource.sort(compare('sort'));
      const data = {
        contentList: dataSource
      };
      this.props.onChange(data);
    } else {
      message.error('请正确填写表单');
    }
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  handleRemove = () => {
    this.props.onRemove(this.props.index, this.props.id);
  };
  handleAddBanner() {
    const { dataSource, index } = this.state;
    dataSource.push({
      key: index
    });
    this.setState({
      dataSource,
      index: index + 1
    });
  }
  handleDeleteBanner = index => {
    const { dataSource } = this.state;
    dataSource.splice(index, 1);
    this.setState({
      dataSource
    });
  };
  handleImgChange = (value, index) => {
    const { dataSource } = this.state;
    dataSource[index].picUrl = value;
    this.setState({
      dataSource
    });
  };
  handleLinkChange = (value, index) => {
    const { dataSource } = this.state;
    dataSource[index].actionUrl = value;
    this.setState({
      dataSource
    });
  };
  handleTrackValueChange = (e, index) => {
    const { dataSource } = this.state;
    dataSource[index].trackValue = e.target.value;
    this.setState({
      dataSource
    });
  };
  handleSortChange = (value, index) => {
    const { dataSource } = this.state;
    dataSource[index].sort = value;
    this.setState({
      dataSource
    });
  };
  handleMove = (dragIndex, hoverIndex) => {
    const { dataSource } = this.state;
    const dragData = dataSource[dragIndex];
    dataSource.splice(dragIndex, 1);
    dataSource.splice(hoverIndex, 0, dragData);
    this.forceUpdate();
  };
  render() {
    const headProps = {
      title: '小banner',
      onSave: this.handleSave,
      onReset: this.handleReset,
      onRemove: this.handleRemove
    };
    const cardStyle = {
      marginTop: '20px'
    };
    const { dataSource } = this.state;
    return (
      <div>
        <div>
          <BaseHead {...headProps} />
          <Form>
            <Button type="primary" onClick={() => this.handleAddBanner()}>
              新增小banner
            </Button>
            {dataSource.length > 0
              ? dataSource.map((item, index) => (
                  <View key={index} index={index} onMove={this.handleMove}>
                    <Card
                      title={`小banner${index + 1}`}
                      style={cardStyle}
                      extra={
                        <Icon
                          type="close"
                          style={{
                            color: 'red',
                            fontSize: '20px',
                            cursor: 'pointer'
                          }}
                          onClick={() => this.handleDeleteBanner(index)}
                        />
                      }
                    >
                      <Form.Item label="*图片">
                        <UploadImg
                          width={750}
                          height={194}
                          style={{ width: '187px', height: '95px' }}
                          onChange={value => this.handleImgChange(value, index)}
                          value={
                            dataSource[index].picUrl
                              ? dataSource[index].picUrl
                              : ''
                          }
                        />
                        <Alert
                          message="格式为png或gif，尺寸750px*194px"
                          type="info"
                          showIcon
                        />
                      </Form.Item>
                      <Form.Item label="打点值">
                        <Input
                          onChange={value =>
                            this.handleTrackValueChange(value, index)
                          }
                          value={
                            dataSource[index].trackValue
                              ? dataSource[index].trackValue
                              : ''
                          }
                        />
                      </Form.Item>
                      <Form.Item label="链接">
                        <LinkGenerPro
                          isShowTrackValue={false}
                          onChange={value =>
                            this.handleLinkChange(value, index)
                          }
                          value={
                            dataSource[index].actionUrl
                              ? dataSource[index].actionUrl
                              : ''
                          }
                        />
                      </Form.Item>
                      <Form.Item label="排序">
                        <InputNumber
                          precision={0}
                          min={1}
                          onChange={value =>
                            this.handleSortChange(value, index)
                          }
                          value={
                            dataSource[index].sort ? dataSource[index].sort : ''
                          }
                        />
                      </Form.Item>
                    </Card>
                  </View>
                ))
              : null}
          </Form>
        </div>
      </div>
    );
  }
}
