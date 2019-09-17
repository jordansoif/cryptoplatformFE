import React from "react";
import {
  Form,
  Input,
  Button,
  Table,
  Popconfirm,
  Divider,
  InputNumber
} from "antd";
import "antd/dist/antd.css";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState, bindActionCreators } from "Redux";
import store from "./reduxStore";
import ReactDOM from "react-dom";
import mountNode from "react-dom";
import { VictoryLine } from "victory";

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testData: [],
      infoLoadToggle: false
    };
    this.placeTrade = this.placeTrade.bind(this);
  }

  placeTrade() {
    let testData = [];
    var i;
    Axios.get(`http://localhost:5000/twodaykline/BNBBTC`).then(res => {
      res.data.map(e => {
        testData.push({ Hours: 0, Price: e[1] });
      });
      for (i = 0; i < testData.length; i++) {
        testData[47 - i].Hours = i;
      }
      this.setState({ testData, infoLoadToggle: !this.state.infoLoadToggle });
    });
    return console.log(testData);
  }

  render() {
    return (
      <div>
        <h1>Hello from the Test Page</h1>
        <button onClick={this.placeTrade}>Test Button</button>
        {this.state.infoLoadToggle == false ? (
          ""
        ) : (
          <VictoryLine data={this.state.testData} x="Hours" y="Price" />
        )}
      </div>
    );
  }
}

export default TestPage;
