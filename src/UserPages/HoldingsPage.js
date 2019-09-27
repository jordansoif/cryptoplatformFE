import { Table, Divider, Tag } from "antd";
import React from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import store from "/ReduxFolder/reduxStore";
import { apiRequest } from "../api";

// EVERYTHING NEEDS UPDATE AFTER BACKEND CHANGES TO ELIMINATE HOLDINGS DOCUMENT

const columns = [
  {
    title: "CryptoCurrency",
    dataIndex: "symbol",
    key: "symbol"
  },
  {
    title: "Current Price",
    dataIndex: "current_price",
    key: "current_price"
  },
  {
    title: "Units Held",
    dataIndex: "units_remaining",
    key: "units_remaining"
  },
  {
    title: "Market Value",
    dataIndex: "position_value",
    key: "position_value"
  },
  {
    title: "Cost Basis",
    dataIndex: "total_cost_basis",
    key: "total_cost_basis"
  },
  {
    title: "Profit or Loss",
    dataIndex: "profit_loss",
    key: "profit_loss"
  }
];

class HoldingsPage extends React.Component {
  state = {
    data: []
  };

  componentWillMount() {
    apiRequest("get", "info/getallholdings").then(res => {
      this.setState({ data: res.data });
    });
  }

  render() {
    return (
      <div>
        <h1>Holdings Page:</h1>
        <Table columns={columns} dataSource={this.state.data} />
      </div>
    );
  }
}

export default HoldingsPage;
