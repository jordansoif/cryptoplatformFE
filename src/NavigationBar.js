import { Menu, Icon } from "antd";
import React from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import store from "/ReduxFolder/reduxStore";

const { SubMenu } = Menu;

class NavigationBar extends React.Component {
  state = {};

  handleClickHoldings = () => {
    return this.props.history.push("/holdings");
  };

  handleClickTrade = () => {
    return this.props.history.push("/tradepage");
  };

  handleClickFundAccount = () => {
    return this.props.history.push("/fundaccount");
  };

  handleClickResearch = () => {
    return this.props.history.push("/research");
  };

  handleClickRealizedTrades = () => {
    return this.props.history.push("/realizedtrades");
  };

  render() {
    return (
      <Menu
        // selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="Holdings" onClick={this.handleClickHoldings}>
          <Icon type="bank" />
          Holdings
        </Menu.Item>
        <Menu.Item key="Trade" onClick={this.handleClickTrade}>
          <Icon type="stock" />
          Trade
        </Menu.Item>
        <Menu.Item key="Fund" onClick={this.handleClickFundAccount}>
          <Icon type="dollar" />
          Fund Account
        </Menu.Item>
        <Menu.Item key="Research" onClick={this.handleClickResearch}>
          <Icon type="read" />
          Research
        </Menu.Item>
        <Menu.Item key="Realized" onClick={this.handleClickRealizedTrades}>
          <Icon type="check-square" />
          Realized Trades
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavigationBar;
