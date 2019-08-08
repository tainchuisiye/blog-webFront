import React, { Component, Fragment } from 'react';
import {
  Modal,
  Tree,
  Card,
  Input,
  Spin,
  List,
  Select,
  Button,
  Checkbox
} from 'antd';
import Styles from './index.less';
import _ from 'lodash';
import ChannelService from '../../pages/channel/chanManage/service';
import address from 'src/utils/address';

const transform = children => {
  if (!children || children.length === 0) {
    return null;
  }
  return children.map(item => ({
    value: item.n,
    label: item.n,
    children: transform(item.c)
  }));
};

const addressList = transform(address);
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

interface RelateChannelProps {
  width?: number; // => 弹窗宽度
  modalStyle?: Object; // => 弹窗主体样式
  checkedKeys: string[]; // => 选中的关联渠道key
  onSave: Function; // => 保存事件回调
  isPrimaryChannel: boolean; // => 是否只显示一级渠道
  showCard?: boolean; // => 是否显示已选渠道名
  unitId?: string; // => 销售单元id
}

interface Parmas {
  province: string; // => 省
  city: string; // => 城市
  channelType: string; // => 渠道类型
}

interface RelateChannelState {
  isShowModal: boolean;
  newCheckedKeys: string[];
  oldCheckKeys: string[];
  channelList: Object[];
  allChannelList: Object[];
  dataSource: Object[];
  loading: boolean;
  checkedChannel: string[];
  oldCheckedChannel: string[];
  searchParams: Parmas;
}

export default class RelateChannel extends Component<
  RelateChannelProps,
  RelateChannelState
> {
  state = {
    isShowModal: false, // => 是否显示弹窗
    oldCheckKeys: [], // => 初始渠道选中数组
    newCheckedKeys: [], // => 最终渠道选中数组
    channelList: [], // => 所有渠道列表
    allChannelList: [], // => 铺平后所有渠道列表
    dataSource: [], // => 所有渠道列表
    loading: false, // => 搜索加载
    checkedChannel: [], // => 已选渠道
    oldCheckedChannel: [], // => 已选渠道初始化
    searchParams: {
      // => 筛选条件
      province: '',
      city: '',
      channelType: ''
    }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.checkedKeys) {
      const keys = nextProps.checkedKeys ? nextProps.checkedKeys : [];
      this.setState({
        oldCheckKeys: keys,
        newCheckedKeys: keys
      });
    }
  }
  /**
   * 获取所有渠道列表
   */
  async initAllState(flag) {
    this.setState({
      loading: true
    });
    const { province, city, channelType } = this.state.searchParams;
    const unitId = this.props.unitId;
    if (unitId) {
      // 销售单元特用
      const { data, status } = await ChannelService.queryTreeListSoldUnit({
        unitId,
        province,
        city,
        channelType
      });
      this.handleAjaxCallBack(flag, data, status);
    } else {
      // 非销售单元用
      const { data, status } = await ChannelService.queryTreeList({
        province,
        city,
        channelType
      });
      this.handleAjaxCallBack(flag, data, status);
    }
  }
  handleAjaxCallBack(flag, data, status) {
    if (data && status === 200) {
      if (flag) {
        const allChannelList = this.renderAllChannelList(data);
        this.setState({
          allChannelList
        });
      }
      const checkedKeys = this.state.newCheckedKeys
        ? this.state.newCheckedKeys
        : this.props.checkedKeys;
      this.renderCheckedChannelName(checkedKeys, true);
      this.setState({
        dataSource: data,
        channelList: data,
        loading: false
      });
    }
  }
  renderCheckedChannelName = (checkedKeys, flag) => {
    const allChannelList = this.state.allChannelList;
    let checkedChannel = [];
    checkedChannel =
      allChannelList &&
      allChannelList.filter(item => {
        return checkedKeys.find(
          item2 => item2.toString() === item.id.toString()
        );
      });
    this.setState(
      {
        checkedChannel
      },
      () => {
        if (flag) {
          this.setState({
            oldCheckedChannel: checkedChannel
          });
        }
      }
    );
  };
  renderTreeNodes = data => {
    return data.map((item, index) => {
      if (item.children && !this.props.isPrimaryChannel) {
        return (
          <TreeNode title={item.name} key={item.id}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={item.name}
          key={item.id}
          disabled={this.props.unitId && item.needGrey}
        />
      );
    });
  };
  onCheck = (obj, { node }) => {
    let keys = [];
    let newCheckedKeys = obj.checked;
    if (node && node.props.children) {
      keys = this.getTreeKey(node.props.children);
      if (node.props.checked) {
        newCheckedKeys = _.difference(obj.checked, keys);
      } else {
        newCheckedKeys = [...keys, ...obj.checked];
        _.uniq(newCheckedKeys);
      }
    }
    this.setState({ newCheckedKeys });
    this.renderCheckedChannelName(newCheckedKeys, false);
  };
  getTreeKey = children => {
    let keys = [];
    children.forEach(item => {
      if (item.key) {
        keys.push(item.key);
        if (item.props && item.props.children) {
          keys = keys.concat(this.getTreeKey(item.props.children));
        }
      }
    });
    return keys;
  };
  handleSave = () => {
    const { oldCheckKeys, newCheckedKeys } = this.state;
    const unSelectKeys = oldCheckKeys.filter(
      item =>
        !newCheckedKeys.find(item2 => item.toString() === item2.toString())
    );
    this.props.onSave(newCheckedKeys, unSelectKeys);
    this.handleCancel();
  };
  handleCancel = () => {
    this.setState({
      isShowModal: false
    });
  };
  handleAfterClose = json => {
    this.setState(json, () => {
      this.initAllState(false);
    });
  };
  handleSearch = e => {
    const value = e.target.value;
    if (value === '') {
      this.setState(
        {
          loading: true
        },
        () => {
          this.initAllState(false);
        }
      );
    }
    const allChannelList = this.state.allChannelList;
    const channelList = [];
    allChannelList.forEach(item => {
      if (this.props.isPrimaryChannel) {
        if (item.name.toString().indexOf(value) !== -1 && item.level === 1) {
          channelList.push(item);
        }
      } else {
        if (item.name.toString().indexOf(value) !== -1) {
          channelList.push(item);
        }
      }
    });
    this.setState({
      channelList
    });
  };
  renderAllChannelList = data => {
    let arr = [];
    data.map(item => {
      if (item.children) {
        arr = arr.concat(this.renderAllChannelList(item.children));
      }
      arr.push(item);
    });
    return arr;
  };
  handleSelectAll = e => {
    const { searchParams } = this.state;
    const keys = this.getCurAllKeys(this.state.channelList);
    if (
      searchParams.province === '' &&
      searchParams.city === '' &&
      searchParams.channelType === ''
    ) {
      keys.push(0);
    }
    const newCheckedKeys = e.target.checked ? keys : [];
    this.renderCheckedChannelName(newCheckedKeys, false);
    this.setState({
      newCheckedKeys
    });
  };
  getCurAllKeys = data => {
    let arr = [];
    data.map(item => {
      if (item.children) {
        if (!this.props.isPrimaryChannel) {
          arr = arr.concat(this.getCurAllKeys(item.children));
        }
      }
      if (!item.needGrey) {
        arr.push(item.id);
      }
    });
    return _.uniq(arr);
  };
  render() {
    const {
      isShowModal,
      newCheckedKeys,
      channelList,
      loading,
      checkedChannel
    } = this.state;
    const { province, city, channelType } = this.state.searchParams;
    const { width, modalStyle, showCard } = this.props;
    const isShowCard = showCard === undefined ? true : showCard;
    const bodyStyle = { height: '600px', overflow: 'auto' };
    const json = {
      newCheckedKeys: this.state.oldCheckKeys,
      checkedChannel: this.state.oldCheckedChannel,
      searchParams: {
        province: '',
        city: '',
        channelType: ''
      }
    };
    let cityList = [];
    if (this.state.searchParams.province !== '') {
      cityList = addressList.find(
        item => item.value === this.state.searchParams.province
      ).children;
    }
    return (
      <Fragment>
        <a
          href="javascript:;"
          onClick={() => {
            this.setState({
              isShowModal: true
            });
            this.initAllState(true);
          }}
        >
          关联渠道
        </a>
        <Modal
          title="关联渠道"
          visible={isShowModal}
          okText="保存"
          onCancel={this.handleCancel}
          onOk={this.handleSave}
          bodyStyle={modalStyle ? modalStyle : bodyStyle}
          width={width ? width : 600}
          destroyOnClose={true}
          afterClose={() => this.handleAfterClose(json)}
        >
          {isShowCard && (
            <Card title="已关联渠道" className={Styles.channel}>
              <List
                dataSource={checkedChannel}
                renderItem={item => (
                  <List.Item key={item.id}>{item.name}</List.Item>
                )}
              />
            </Card>
          )}
          <Search
            style={{ marginBottom: 8 }}
            placeholder="请输入关键词"
            onChange={this.handleSearch}
          />
          <div className={Styles.searchWrap}>
            <Select
              showSearch
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              size="small"
              value={province}
              onChange={value => {
                const params = {
                  province: value.toString(),
                  city: '',
                  channelType: ''
                };
                const searchParams = { ...this.state.searchParams, ...params };
                this.setState({ searchParams }, () => {
                  this.initAllState(false);
                });
              }}
              style={{ width: 100, marginRight: 10 }}
            >
              <Select.Option value="">省份</Select.Option>
              {addressList.map(item => (
                <Select.Option value={item.value} key={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
            <Select
              size="small"
              showSearch
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              value={city}
              onChange={value => {
                const parmas = { city: value.toString() };
                const searchParams = { ...this.state.searchParams, ...parmas };
                this.setState({ searchParams }, () => {
                  this.initAllState(false);
                });
              }}
              style={{ width: 100, marginRight: 10 }}
            >
              <Select.Option value="">城市</Select.Option>
              {cityList.map(item => (
                <Select.Option value={item.value} key={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
            <Select
              size="small"
              value={channelType}
              onChange={value => {
                const parmas = { channelType: value.toString() };
                const searchParams = { ...this.state.searchParams, ...parmas };
                this.setState({ searchParams }, () => {
                  this.initAllState(false);
                });
              }}
              style={{ width: 100, marginRight: 10 }}
            >
              <Select.Option value="">渠道类型</Select.Option>
              <Select.Option value="1">普通渠道</Select.Option>
              <Select.Option value="2">代运营</Select.Option>
            </Select>
            <Button
              type="danger"
              onClick={() => {
                this.setState(
                  {
                    searchParams: {
                      province: '',
                      city: '',
                      channelType: ''
                    }
                  },
                  () => {
                    this.initAllState(false);
                  }
                );
              }}
            >
              重置
            </Button>
          </div>
          <Spin spinning={loading}>
            <Checkbox onChange={this.handleSelectAll}>全选</Checkbox>,
            <Tree
              checkable
              defaultExpandAll={true}
              onCheck={this.onCheck}
              checkedKeys={{
                checked: newCheckedKeys,
                halfChecked: []
              }}
              checkStrictly={true}
            >
              {this.renderTreeNodes(channelList)}
            </Tree>
          </Spin>
        </Modal>
      </Fragment>
    );
  }
}
