import React from "react";
import {
  Form,
  Input,
  Button,
  Table,
  Popconfirm,
  Divider,
  InputNumber
} from "antd";
import "antd/dist/antd.css";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState, bindActionCreators } from "Redux";
import store from "./reduxStore";
import ReactDOM from "react-dom";
import mountNode from "react-dom";
import { VictoryLine } from "victory";

const testData = [
  {
    cost_per_unit: 0.01781,
    purchase_date_time: "2019-09-10T18:49:43.583000",
    units_purchased: 9
  }
];

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "John",
      currentUserBitcoin: 0,
      sharesToTrade: 0, //share quantity
      selectedTradeType: "", //buy/sell
      selectedSymbol: "", //symbol
      tradeValueCalc: 0, //value to be subtracted/added to cash
      pricePerShare: 0, //share price for buy/sell
      currencySelection: [], //shares shown in currency selector
      lotsToLoad: [], //share lots shown for sale when order/crypto is selected
      saleLots: [] // share lots selected to be sold
    };
    this.placeTrade = this.placeTrade.bind(this);
  }

  placeTrade() {
    // remember to add back if statement for "Buy"
    Axios.put(`http://localhost:5000/sellcrypto`, {
      // user: this.state.currentUser,
      // symbol: this.state.selectedSymbol,
      // share_price: this.state.pricePerShare,
      // trade_value_calc: this.state.tradeValueCalc,
      // total_shares_being_sold: this.state.sharesToTrade,
      // sale_lots: this.state.saleLots
      // TEST PAYLOAD BELOW, ACTUAL PAYLOAD ABOVE
      user: "John",
      symbol: "ETHBTC",
      share_price: 0.02,
      trade_value_calc: 0.6,
      total_shares_being_sold: 9,
      sale_lots: [
        {
          cost_per_unit: 0.01781,
          purchase_date_time: "2019-09-10T18:49:43.583000",
          units_purchased: 9
        },
        {
          cost_per_unit: 0.01781,
          purchase_date_time: "2019-09-10T18:49:43.583000",
          units_purchased: 6
        }
      ]
    }).then(res => console.log(res));
  }

  render() {
    return (
      <div>
        <h1>Hello from the Test Page</h1>
        <button onClick={this.placeTrade}>Test Button</button>
      </div>
    );
  }
}

export default TestPage;

// this.testButton = this.testButton.bind(this);
// testButton() {
//   Axios.get(`http://localhost:5000/twodaykline/BNBBTC`)
//     .then(res => {
//       res.data.map(e => {
//         testData.push({ Hours: 0, Price: e[1] });
//       });
//     })
//     .then(e => {
//       for (i = 0; i < 49; i++) {
//         testData[i]((Hours = i));
//       }
//     });
//   this.setState({ infoLoadToggle: !this.state.infoLoadToggle });
//   return console.log(testData);
// }
// {this.state.infoLoadToggle == false ? (
//   ""
// ) : (
//   <VictoryLine data={testData} x="Hours" y="Price" />
// )}
