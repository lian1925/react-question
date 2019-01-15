import React, { Component } from "react";
import { Button, Input } from "antd";

import "./index.less";
export default class index extends Component {
  state = {
    bigArray: "1,2,3,4",
    itemCount: 2,
    outputArray: []
  };
  handleInputChange = (e, target) => {
    // console.log(e, target);

    this.setState({
      [target]: e.target.value
    });
  };
  handleArray = e => {
    let value = this.refs.bigArray.props.value;
    value = value.split(",");

    let itemCount = this.state.itemCount;
    itemCount = parseInt(itemCount);
    if (itemCount === 1) {
      this.setState({
        outputArray: [value]
      });
      return;
    }
    console.log(itemCount);
    let outputArray = [];

    for (var f of this.algorithm_u(value, itemCount)) {
      outputArray.push(f);
    }
    this.setState({
      outputArray
    });
  };
  algorithm_u = (ns, m) => {
    function visit(n, a) {
      let ps = [];
      for (let i = 0; i < m; i++) {
        ps.push([]);
      }
      for (let j = 0; j < n; j++) {
        // console.log(31, a);

        ps[a[j + 1]].push(ns[j]);
      }

      return ps;
    }

    function* f(mu, nu, sigma, n, a) {
      if (mu == 2) {
        yield visit(n, a);
      } else {
        for (let v of f(mu - 1, nu - 1, (mu + sigma) % 2, n, a)) {
          yield v;
        }
      }
      if (nu == mu + 1) {
        a[mu] = parseInt(mu - 1);

        yield visit(n, a);
        while (a[nu] > 0) {
          a[nu] = a[nu] - 1;
          yield visit(n, a);
        }
      } else if (nu > mu + 1) {
        if ((mu + sigma) % 2 == 1) {
          a[nu - 1] = mu - 1;
        } else {
          a[mu] = mu - 1;
        }
        if ((a[nu] + sigma) % 2 == 1) {
          for (let v of b(mu, nu - 1, 0, n, a)) {
            yield v;
          }
        } else {
          for (let v of f(mu, nu - 1, 0, n, a)) {
            yield v;
          }
        }

        while (a[nu] > 0) {
          a[nu] = a[nu] - 1;
          if ((a[nu] + sigma) % 2 == 1) {
            for (let v of b(mu, nu - 1, 0, n, a)) {
              yield v;
            }
          } else {
            for (let v of f(mu, nu - 1, 0, n, a)) {
              yield v;
            }
          }
        }
      }
    }

    function* b(mu, nu, sigma, n, a) {
      if (nu == mu + 1) {
        while (a[nu] < mu - 1) {
          yield visit(n, a);
          a[nu] = a[nu] + 1;
        }
        yield visit(n, a);
        a[mu] = 0;
      } else if (nu > mu + 1) {
        if ((a[nu] + sigma) % 2 == 1) {
          for (let v of f(mu, nu - 1, 0, n, a)) {
            yield v;
          }
        } else {
          for (let v of b(mu, nu - 1, 0, n, a)) {
            yield v;
          }
        }
        while (a[nu] < mu - 1) {
          a[nu] = a[nu] + 1;
          if ((a[nu] + sigma) % 2 == 1) {
            for (let v of f(mu, nu - 1, 0, n, a)) {
              yield v;
            }
          } else {
            for (let v of b(mu, nu - 1, 0, n, a)) {
              yield v;
            }
          }
        }
        if ((mu + sigma) % 2 == 1) {
          a[nu - 1] = 0;
        } else {
          a[mu] = 0;
        }
      }
      if (mu == 2) {
        yield visit(n, a);
      } else {
        for (let v of b(mu - 1, nu - 1, (mu + sigma) % 2, n, a)) {
          yield v;
        }
      }
    }
    let n = ns.length;
    let a = [];
    for (let i = 0; i < n + 1; i++) {
      a.push(0);
    }
    // console.log(1, a);
    for (let k = 1; k < m + 1; k++) {
      a[n - m + k] = k - 1;
      // console.log(k - 1);
    }
    console.log(2, a);
    return f(m, n, 0, n, a);
  };
  componentDidMount() {
    // let a = this.algorithm_u([1, 2, 3], 3);
    // console.log(a);
    // for (var f of this.algorithm_u(["11", "02"], 2)) {
    //   console.log(f);
    // }
  }
  render() {
    return (
      <div>
        <h2>2-集合的划分</h2>
        <div className="content">
          <h3>问题背景</h3>
          <p>
            春节快到了，很多人开始大量囤年货，对于电商平台，此时将面临一个挑战：同一个用户购买的多件商品，如何进行物流拆单，才能保证成本最优？每个物流包裹需计算首重费用，续重费用，同时每个包裹有重量限制。
          </p>
          <p>
            这个问题，我理解为获取所有的物流拆单方案，删除不满足条件的方案，然后计算并得出成本最小的方案。
          </p>
          <p>
            将这个问题抽象成一般的算法表述，即为：求解一个集合的全部划分方式。
          </p>
          <h3>问题描述</h3>
          <p>求解一个集合的所有划分方式</p>
          <p>示例：</p>
          <p>输入集合 [1,2], 子集的个数 2 </p>
          <p>输出结果 [1],[2]</p>
          <p>提醒：给定的集合不包含重复项</p>

          <h3>相关思路</h3>
          <p>待补充</p>
          <h3>演示</h3>
          <p>输入集合，如：1,2</p>
          <Input
            style={{ width: 300, marginRight: 20 }}
            ref="bigArray"
            placeholder="输入数组"
            onChange={e => this.handleInputChange(e, "bigArray")}
            value={this.state.bigArray}
          />
          <div />
          <Input
            style={{ width: 80, marginRight: 20 }}
            type="number"
            ref="itemCount"
            placeholder="输入分割的块数"
            onChange={e => this.handleInputChange(e, "itemCount")}
            value={this.state.itemCount}
          />
          <Button type="primary" onClick={this.handleArray}>
            确定
          </Button>
          <p />
          <p>输出结果</p>
          {this.state.outputArray.map((item, index) => (
            <div key={JSON.stringify(item)}>
              <span>{`第${index}组：`}</span>
              {JSON.stringify(item)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
