import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import store from "./reduxStore";
import ReactDOM from "react-dom";
import mountNode from "react-dom";
import { InputNumber } from "antd";
import { autoHeader } from "./api";

class FundAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userBitcoinLast: null,
      userBitcoinNow: 0,
      inputValue: 0
    };
    this.inputChange = this.inputChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentWillMount() {
    autoHeader(get, "info/getuserbitcoin")
      // Axios({
      //   method: "get",
      //   url: "http://localhost:5000/info/getuserbitcoin",
      //   headers: getAuthHeader()
      // })
      .then(res => {
        this.setState({
          userBitcoinLast: this.state.userBitcoinNow,
          userBitcoinNow: res.data
        });
      });
  }

  shouldComponentUpdate() {
    const changeInBitcoin =
      this.state.userBitcoinNow != this.state.userBitcoinLast;
    return changeInBitcoin;
  }

  inputChange(e) {
    var valueToNum = Number.parseFloat(e.target.value);
    this.setState({
      inputValue: valueToNum
    });
  }

  buttonClick() {
    Axios({
      method: "put",
      url: "http://localhost:5000/info/updatebitcoin",
      data: { bitcoin: this.state.inputValue },
      headers: getAuthHeader()
    }).then(res => console.log(res.data));
  }

  render() {
    return (
      <div>
        <h1>Fund Account Page:</h1>
        <h3>Current Account Balance: ₿{this.state.userBitcoinNow}</h3>
        <Input
          onChange={this.inputChange}
          prefix="₿"
          placeholder="Enter Value to add to account."
        />
        <Button type="primary" onClick={this.buttonClick}>
          Add to Account
        </Button>
      </div>
    );
  }
}

export default FundAccount;
