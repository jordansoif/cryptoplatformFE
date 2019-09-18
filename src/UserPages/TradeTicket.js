import { Button } from "antd";
import React from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import store from "/ReduxFolder/reduxStore";
import { connect } from "net";

class TradeTicket extends React.Component {
  state = { testInfo: "testing" };

  buttonClick = () => {
    return this.props.history.push("/holdings");
  };

  render() {
    const mapStateToProps = state => {
      return this.state.testInfo;
    };

    return (
      <div>
        <h>Trade Ticket:</h>
        <ul>
          <li>Order Type:</li>
          <li>Symbol:</li>
          <li>Quantity of Units:</li>
          <li>Per Unit Price:</li>
          <li>Lots Sold:</li>
          <li></li>
          <li></li>
        </ul>
        <Button onClick={buttonClick}>Go To Holdings</Button>
      </div>
    );
  }
}

connect(mapStateToProps)(TradeTicket);
export default TradeTicket;
