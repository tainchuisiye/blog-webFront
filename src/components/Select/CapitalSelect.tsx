import React from 'react';
import { Select } from 'antd';
import Service from 'src/service';
const Option = Select.Option;
export default class CapitalSelect extends React.Component<any> {
  state = {
    capitalLists: []
  };
  getCapitalLists = async () => {
    const { data, status } = await Service.getCapitalLists();
    if (status === 200 && data instanceof Array) {
      this.setState({
        capitalLists: data
      });
    }
  };
  componentWillMount() {
    this.getCapitalLists();
  }
  render() {
    const { capitalLists } = this.state;
    return (
      <Select
        showSearch
        allowClear
        style={{ width: '100%', marginRight: 15 }}
        placeholder="请选择资方"
        optionFilterProp="children"
        onChange={this.props.onChange}
        value={this.props.value}
      >
        {capitalLists.map((item, i) => (
          <Option value={item.id} key={i}>
            {item.name}
          </Option>
        ))}
      </Select>
    );
  }
}
