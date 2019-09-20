import { Button } from "antd";
import React from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import store from "/ReduxFolder/reduxStore";
import { connect } from "react-redux";

class TradeTicket extends React.Component {
  state = {
    orderType: "",
    symbol: "",
    quantity: "",
    unitPrice: ""
  };

  componentWillMount() {
    const { state } = this.props;
    this.setState({
      orderType: state.tradeConfirmation.orderType,
      symbol: state.tradeConfirmation.symbol,
      quantity: state.tradeConfirmation.totalShares,
      unitPrice: state.tradeConfirmation.unitPrice
    });
  }

  buttonClick = () => {
    return this.props.history.push("/holdings");
  };

  render() {
    return (
      <div>
        <h1>Trade Ticket:</h1>
        <ul>
          <li>Order Type: {this.state.orderType}</li>
          <li>Symbol: {this.state.symbol}</li>
          <li>Quantity of Units: {this.state.quantity}</li>
          <li>Per Unit Price: {this.state.unitPrice}</li>
          {/* <li>Lots Sold: {this.state.orderType}</li> */}
          <li></li>
          <li></li>
        </ul>
        <Button onClick={this.buttonClick}>Go To Holdings</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
    // orderType: state.orderType,
    // symbol: state.symbol,
    // totalShares: state.quantity,
    // unitPrice: state.unitPrice
  };
};

export default connect(mapStateToProps)(TradeTicket);
