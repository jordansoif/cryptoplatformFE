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
    const { reduxProps } = this.props;
    this.setState({
      orderType: reduxProps.orderType,
      symbol: reduxProps.symbol,
      quantity: reduxProps.totalShares,
      unitPrice: reduxProps.unitPrice
    });
  }

  buttonClickHoldings = () => {
    return this.props.history.push("/holdings");
  };

  buttonClickRealized = () => {
    return this.props.history.push("/realizedtrades");
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
        </ul>
        <Button onClick={this.buttonClickHoldings}>Go To Holdings</Button>
        {this.props.reduxProps.orderType == "Sell" ? (
          <Button onClick={this.buttonClickRealized}>
            Go To Realized Holdings
          </Button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reduxProps: state.tradeConfirmation
  };
};

export default connect(mapStateToProps)(TradeTicket);
