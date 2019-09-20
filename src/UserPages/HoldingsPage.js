import { Table, Divider, Tag } from "antd";
import React from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import store from "/ReduxFolder/reduxStore";
import { apiRequest } from "../api";

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
    dataIndex: "units_held",
    key: "units_held"
  },
  {
    title: "Market Value",
    dataIndex: "position_value",
    key: "position_value"
  },
  {
    title: "Average Unit Cost",
    dataIndex: "average_cost_per_unit",
    key: "average_cost_per_unit"
  },
  {
    title: "Cost Basis",
    dataIndex: "total_cost_basis",
    key: "total_cost_basis"
  },
  {
    title: "Profit or Loss",
    dataIndex: "profit_or_loss",
    key: "profit_or_loss"
  }
];

class HoldingsPage extends React.Component {
  state = {
    data: []
  };

  componentWillMount() {
    apiRequest("get", "info/getallholdings").then(res => {
      var dataArray = [];
      res.data.map(e => dataArray.push(e));
      this.setState({ data: dataArray });
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
