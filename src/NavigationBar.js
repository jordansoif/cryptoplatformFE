import { Menu, Icon } from "antd";
import React from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import store from "/ReduxFolder/reduxStore";

const { SubMenu } = Menu;

class NavigationBar extends React.Component {
  state = {};

  handleOnClick = e => {
    return this.props.history.push(`/${e.key}`);
  };

  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="holdings" onClick={this.handleOnClick}>
          <Icon type="bank" />
          Holdings
        </Menu.Item>
        <Menu.Item key="tradepage" onClick={this.handleOnClick}>
          <Icon type="stock" />
          Trade
        </Menu.Item>
        <Menu.Item key="fundaccount" onClick={this.handleOnClick}>
          <Icon type="dollar" />
          Fund Account
        </Menu.Item>
        <Menu.Item key="news" onClick={this.handleOnClick}>
          <Icon type="read" />
          News
        </Menu.Item>
        <Menu.Item key="realizedtrades" onClick={this.handleOnClick}>
          <Icon type="check-square" />
          Realized Trades
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavigationBar;
