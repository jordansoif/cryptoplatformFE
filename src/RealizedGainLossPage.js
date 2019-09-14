import { Menu, Icon } from "antd";
import React from "react";
import "antd/dist/antd.css";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import store from "./reduxStore";

class RealizedGainLossPage extends React.Component {
  render() {
    return <div>Realized Gain/Loss Page:</div>;
  }
}

export default RealizedGainLossPage;
