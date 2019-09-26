import { Button } from "antd";
import React from "react";
import { connect } from "react-redux";

// Page not yet cleaned, awaiting backend changes before completing this page

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
    return this.props.history.push("/li/holdings");
  };

  buttonClickRealized = () => {
    return this.props.history.push("/li/realizedtrades");
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
