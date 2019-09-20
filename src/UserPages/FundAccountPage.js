import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import store from "/ReduxFolder/reduxStore";
import ReactDOM from "react-dom";
import mountNode from "react-dom";
import { InputNumber } from "antd";
import { apiRequest } from "../api";

class FundAccount extends React.Component {
  state = {
    userBitcoinNow: 0,
    inputValue: 0,
    resOutput: ""
  };

  componentWillMount() {
    apiRequest("get", "info/getuserbitcoin").then(res => {
      this.setState({
        userBitcoin: res.data
      });
    });
  }

  inputChange = e => {
    var valueToNum = Number.parseFloat(e.target.value);
    this.setState({
      inputValue: valueToNum
    });
  };

  buttonClick = () => {
    apiRequest("put", "info/updatebitcoin", {
      bitcoin: this.state.inputValue
    }).then(res =>
      this.setState({
        resOutput: res.data,
        userBitcoin: this.state.userBitcoin + this.state.inputValue
      })
    );
  };

  render() {
    return (
      <div>
        <h1>Fund Account Page:</h1>
        <h3>Current Account Balance: ₿{this.state.userBitcoin}</h3>
        <Input
          onChange={this.inputChange}
          prefix="₿"
          placeholder="Enter Value to add to account."
        />
        <p>{this.state.resOutput}</p>
        <Button type="primary" onClick={this.buttonClick}>
          Add to Account
        </Button>
      </div>
    );
  }
}

export default FundAccount;
