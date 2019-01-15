import React, { Component } from "react";
import "./index.less";
import { Button, message } from "antd";
import collection from "@/views/1-collection";

import part from "@/views/2-part";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoSrc: "",
      srcObject: "",
      width: window.innerWidth
    };
  }

  savePhoto = e => {
    console.log(1);
    const ctx = this.canvas.getContext("2d");
    ctx.drawImage(this.video, 0, 0, 300, 200);
  };

  componentDidMount() {}
  startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          this.video.srcObject = stream;
          var playPromise = this.video.play();

          if (playPromise !== undefined) {
            playPromise
              .then(_ => {
                // Automatic playback started!
                // Show playing UI.
              })
              .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
                console.log(error);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  stopCamera = () => {
    var track = this.video.srcObject.getTracks()[0]; // if only
    track.stop();
    message.success("停止成功");
  };
  render() {
    const note = (
      <div className="note">
        <h2>备注</h2>
        <p>记录工作，生活中，与朋友讨论一些有趣的编程问题，及相关思路</p>
      </div>
    );
    return (
      <div className="home-container">
        <div className="header">
          <h2>编程问题集锦 demo</h2>
          <div className="link">
            <Link to="/">home</Link>
            <Link to="/1-collection">1-求解集合的子集</Link>
            <Link to="/2-part">2-集合的划分</Link>
          </div>
        </div>
        <div>
          <Switch>
            <Route path="/1-collection" component={collection} />
            <Route path="/2-part" component={part} />
            <Route component={() => note} />
          </Switch>
        </div>
      </div>
    );
  }
}
