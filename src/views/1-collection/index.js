import React, { Component } from "react";

import { Button, Input } from "antd";
import "./index.less";
export default class index extends Component {
  state = {
    bigArray: "",
    outputArray: []
  };
  handleInputChange = e => {
    console.log(e.target.value.length);

    this.setState({
      bigArray: e.target.value
    });
  };
  handleArray = e => {
    let value = this.refs.bigArray.props.value;
    value = value.split(",");

    let outputArray = this.getAllSubsets(value);
    this.setState({
      outputArray
    });
    console.log(JSON.stringify(outputArray));
  };
  getAllSubsets = theArray =>
    theArray.reduce(
      (subsets, value) => subsets.concat(subsets.map(set => [value, ...set])),
      [[]]
    );
  componentDidMount() {}
  render() {
    return (
      <div>
        <h2>1-求解集合的子集</h2>
        <div className="content">
          <h3>问题描述</h3>
          <p>求解一个集合的所有子集</p>
          <p>示例：</p>
          <p>输入集合 [1,2]</p>
          <p>输出结果 [], [1], [2], [1,2]</p>
          <p>提醒：给定的集合不包含重复项</p>

          <h3>相关思路</h3>
          <p>待补充</p>
          <h3>演示</h3>
          <p>输入集合，如：1,2</p>
          <Input
            style={{ width: 300, marginRight: 20 }}
            ref="bigArray"
            placeholder="输入数组"
            onChange={this.handleInputChange}
            value={this.state.bigArray}
          />
          <Button type="primary" onClick={this.handleArray}>
            确定
          </Button>
          <p />
          <p>输出结果</p>
          {JSON.stringify(this.state.outputArray)}
        </div>
      </div>
    );
  }
}
