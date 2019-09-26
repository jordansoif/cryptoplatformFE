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
      console.log(res);
      var dataArray = [];
      res.data.map(e => {
        dataArray.filter(purchaseLot => {
          if (purchaseLot.symbol !== e.symbol) {
            dataArray.push;
          }
        });
      });
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

// function updateInventory(arr1, arr2) {
//   // A helper method to return the index of
//   // a specified product (undefined if not found)
//   var getPurchaseLotIndex = function (name) {
//       for (var i = 0; i < this.length; i++) {
//         if (this[i].symbol === name) {
//               return i;
//           }
//       }
//       return undefined;
//   }

//   // For each item of the new Inventory
//   for (var i = 0; i < arr2.length; i++) {
//       let index = getPurchaseLotIndex.call(arr1, arr2[i].symbol);
//       if (index === undefined) {
//           arr1.push(arr2[i]);
//       } else {
//           // Add the new quantity of the current item
//           arr1[index]. += arr2[i][0];
//       }
//   }
//   return arr1;
// }
