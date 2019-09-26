import React from "react";
import { Input, Button } from "antd";
import { apiRequest } from "../api";

//Unmount resOutput and error when entering new information

class FundAccount extends React.Component {
  state = {
    userBitcoinNow: 0,
    inputValue: null,
    resOutput: null,
    error: null
  };

  componentWillMount() {
    apiRequest("get", "info/getuserbitcoin").then(res => {
      this.setState({
        userBitcoin: res.data
      });
    });
  }

  inputChange = e => {
    this.setState({
      inputValue: parseFloat(e.target.value)
    });
  };

  updateBitcoinButton = () => {
    if (
      this.state.inputValue === 0 ||
      this.state.inputValue === null ||
      isNaN(this.state.inputValue)
    ) {
      return this.setState({ error: "Please input a valid value." });
    }
    apiRequest("put", "info/updatebitcoin", {
      bitcoin: this.state.inputValue
    })
      .then(res => {
        return this.setState({
          resOutput: res.data,
          userBitcoin: this.state.userBitcoin + this.state.inputValue
        });
      })
      .catch(err => {
        return this.setState({
          error: "An error has occurred, please try again."
        });
      });
  };

  render() {
    return (
      <div>
        <h1>Fund Account Page:</h1>
        <h3>Current Account Balance: ₿{this.state.userBitcoin}</h3>
        <Input
          onChange={this.inputChange}
          type="number"
          prefix="₿"
          placeholder="Enter value to add to account."
        />
        <p>{this.state.resOutput}</p>
        <p>{this.state.error}</p>
        <Button type="primary" onClick={this.updateBitcoinButton}>
          Add to Account
        </Button>
      </div>
    );
  }
}

export default FundAccount;
