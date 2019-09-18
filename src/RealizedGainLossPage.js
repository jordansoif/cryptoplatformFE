import { Menu, Icon, Table } from "antd";
import React from "react";
import "antd/dist/antd.css";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import store from "./reduxStore";
import { getAuthHeader } from "./api";

const columns = [
  {
    title: "CryptoCurrency",
    dataIndex: "symbol",
    key: "symbol"
  },
  {
    title: "Units Sold",
    dataIndex: "units_sold",
    key: "units_sold"
  },
  {
    title: "Purchase Price",
    dataIndex: "purchase_price",
    key: "purchase_price"
  },
  {
    title: "Sale Price",
    dataIndex: "sale_price",
    key: "sale_price"
  },
  {
    title: "Profit or Loss",
    dataIndex: "profit_loss",
    key: "profit_loss"
  },
  {
    title: "Profit or Loss Percentage",
    dataIndex: "profit_loss_percent",
    key: "profit_loss_percent"
  },
  {
    title: "Purchase Date",
    dataIndex: "purchase_date_time",
    key: "purchase_date_time"
  },
  {
    title: "Sale Date",
    dataIndex: "sale_date_time",
    key: "sale_date_time"
  }
];

class RealizedGainLossPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    Axios({
      method: "get",
      url: "http://localhost:5000/info/getallrealized",
      headers: getAuthHeader()
    }).then(res => {
      var dataArray = [];
      res.data.map(e => dataArray.push(e));
      this.setState({ data: dataArray });
    });
  }

  render() {
    return (
      <div>
        <h1>Realized Gain/Loss Page:</h1>
        <Table columns={columns} dataSource={this.state.data} />
      </div>
    );
  }
}

export default RealizedGainLossPage;
