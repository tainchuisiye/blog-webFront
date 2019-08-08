import React from 'react';
import BaseProps from 'src/declare/baseProps';
import {
  Form,
  Input,
  Card,
  Alert,
  Radio,
  Table,
  InputNumber,
  Button,
  Icon,
  message
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
    dataSource: [],
    index: 0,
    title: ''
  };
  componentDidMount() {
    const data = this.props.content;
    if (data && data.contentInfo) {
      const dataSource = data.contentInfo.carItemList
        ? data.contentInfo.carItemList
        : [];
      const title = data.title ? data.title : '';
      this.setState({
        dataSource,
        title
      });
    }
  }
  handleSave = () => {
    const { title, dataSource } = this.state;
    let flag = true;
    dataSource.forEach(item => {
      if (item.actionUrl) {
        const json = JSON.parse(
          decodeURIComponent(item.actionUrl.split('?param=')[1])
        );
        if (!json.id) {
          flag = false;
        }
      } else {
        flag = false;
      }
    });
    if (flag) {
      let contentInfo = null;
      if (this.props.form.getFieldValue('type') === '1') {
        contentInfo = {
          carItemList: dataSource
        };
      }
      const data = {
        contentInfo,
        title: this.state.title
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
  handleAddData = () => {
    const { dataSource, index } = this.state;
    dataSource.push({
      key: index
    });
    this.setState({
      dataSource,
      index: index + 1
    });
  };
  handleDeleteData = index => {
    const { dataSource } = this.state;
    dataSource.splice(index, 1);
    this.setState({
      dataSource
    });
  };
  handleSaveId = (value, index) => {
    const { dataSource } = this.state;
    dataSource[index].id = value;
    this.setState({
      dataSource
    });
  };
  handleSaveLink = (value, index) => {
    const { dataSource } = this.state;
    dataSource[index].actionUrl = value;
    this.setState({
      dataSource
    });
  };
  handleTrackValue = (e, index) => {
    const { dataSource } = this.state;
    dataSource[index].trackValue = e.target.value;
    this.setState({
      dataSource
    });
  };
  handleSaveTitle = e => {
    const title = e.target.value;
    this.setState({
      title
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const headProps = {
      title: '导购栏样式7',
      onSave: this.handleSave,
      onReset: this.handleReset,
      onRemove: this.handleRemove
    };
    const columns = [
      // {
      //   title: 'ID',
      //   dataIndex: 'id',
      //   key: '0',
      //   width: '60px',
      //   render: (text, row, index) => (
      //     <span>
      //       <InputNumber
      //         min={0}
      //         style={{ width: '60px' }}
      //         onChange={value => this.handleSaveId(value, index)}
      //         value={text}
      //         precision={0}
      //       />
      //     </span>
      //   )
      // },
      {
        title: '链接及打点值',
        dataIndex: 'info',
        key: '1',
        render: (text, row, index) => (
          <span>
            <LinkGenerPro
              isOnlyCars
              isShowTrackValue={false}
              onChange={value => this.handleSaveLink(value, index)}
              value={row.actionUrl ? row.actionUrl : ''}
            />
            <br />
            <Input
              placeholder="请输入打点值"
              value={row.trackValue ? row.trackValue : ''}
              onChange={e => this.handleTrackValue(e, index)}
              style={{ marginTop: '10px' }}
            />
          </span>
        )
      },
      {
        title: '',
        dataIndex: 'operation',
        key: '3',
        render: (text, row, index) => (
          <span>
            <Icon
              type="close-circle"
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={() => this.handleDeleteData(index)}
            />
          </span>
        )
      }
    ];
    const { dataSource, title } = this.state;
    return (
      <div>
        <BaseHead {...headProps} />
        <Form>
          <Form.Item label="标题">
            <Input
              placeholder="请输入标题"
              onChange={e => this.handleSaveTitle(e)}
              value={title ? title : ''}
            />
          </Form.Item>
          <Form.Item label="车辆生成规则">
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '必填项' }],
              initialValue:
                this.props.content.contentInfo &&
                this.props.content.contentInfo.carItemList.length > 0
                  ? '1'
                  : '0'
            })(
              <RadioGroup>
                <RadioButton value="0">根据浏览记录自动生成</RadioButton>
                <RadioButton value="1" style={{ marginLeft: '20px' }}>
                  自定义配置
                </RadioButton>
              </RadioGroup>
            )}
          </Form.Item>
          {this.props.form.getFieldValue('type') === '1' ? (
            <div>
              <Button type="primary" onClick={() => this.handleAddData()}>
                增加
              </Button>
              <Table dataSource={dataSource} rowKey="key" columns={columns} />
            </div>
          ) : null}
        </Form>
      </div>
    );
  }
}
