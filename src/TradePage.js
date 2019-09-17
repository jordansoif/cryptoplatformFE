import { Menu, Icon, Cascader, InputNumber, Button, Table } from "antd";
import React from "react";
import "antd/dist/antd.css";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import store from "./reduxStore";

const optionsBuySell = [
  {
    value: "Buy",
    label: "Buy"
  },
  {
    value: "Sell",
    label: "Sell"
  }
];

class TradePage extends React.Component {
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
    this.shareInput = this.shareInput.bind(this);
    this.tradeTypeInput = this.tradeTypeInput.bind(this);
    this.symbolInput = this.symbolInput.bind(this);
    this.calcTradeValue = this.calcTradeValue.bind(this);
    this.placeTrade = this.placeTrade.bind(this);
    this.lotsToBeSold = this.lotsToBeSold.bind(this);
    this.testRun = this.testRun.bind(this);
  }

  componentWillMount() {
    Axios.get(`http://localhost:5000/getuserbitcoin/John`).then(res =>
      this.setState({ currentUserBitcoin: res.data })
    );
  }

  tradeTypeInput(e) {
    if (e[0] == "Buy") {
      var mapCurrency = [];
      Axios.get(`http://localhost:5000/getallsymbols`).then(res => {
        res.data.map(e => {
          if (e.symbol.slice(-3) === "BTC") {
            mapCurrency.push({ value: e.symbol, label: e.symbol });
          }
        });
      });
      this.setState({
        currencySelection: mapCurrency,
        selectedTradeType: e[0]
      });
    } else if (e[0] == "Sell") {
      var mapCurrency = [];
      Axios.put(`http://localhost:5000/getallsymbolholdings`, {
        user: this.state.currentUser
      }).then(res => {
        res.data.map(e =>
          mapCurrency.push({ value: e.symbol, label: e.symbol })
        );
      });
      this.setState({
        currencySelection: mapCurrency,
        selectedTradeType: e[0]
      });
    }
  }

  symbolInput(e) {
    if (this.state.selectedTradeType == "Sell") {
      Axios.put(`http://localhost:5000/getsymbolpurchaselots`, {
        user: this.state.currentUser,
        symbol: e[0]
      }).then(res => {
        const lotsToLoad = [...res.data];
        this.setState({ lotsToLoad, selectedSymbol: e[0], saleLots: [] });
      });
    } else this.setState({ selectedSymbol: e[0] });
  }

  shareInput(e) {
    this.setState({ sharesToTrade: e });
  }

  lotsToBeSold(e, key) {
    var copySaleLots = this.state.saleLots; //Runs every yime so copy current saleLots
    const filterIndex = copySaleLots.filter(
      //filter to see if saleLot already exists for this lot
      obj => obj.saleLotInfo.id == key.id
    );
    if (filterIndex.length === 0) {
      //if no saleLot exists for this new one, create one
      copySaleLots.push({
        value: e,
        saleLotInfo: key
      });
      return this.setState({ saleLots: copySaleLots }); //set saleLots to copy of new modified saleLots
    } // id is unique, so filterIndex returns an empty array or an object, if we make it here, we found it
    if (filterIndex[0].value !== e) {
      // if the value has changed from previous, continue below
      var reverseFilterIndex = copySaleLots.filter(
        //get all other saleLots, then add a new one in place
        obj => obj.saleLotInfo.id !== key.id // of the object that was found
      );
      reverseFilterIndex.push({
        value: e,
        saleLotInfo: key
      });
      return this.setState({ saleLots: reverseFilterIndex });
    }
    return; //do nothing if the value hasn't changed and a saleLot already exists
  }

  calcTradeValue() {
    if (this.state.selectedTradeType == "Buy") {
      Axios.get(
        `http://localhost:5000/getsymbolinfo/${this.state.selectedSymbol}`
      ).then(res => {
        var parsedData = parseFloat(res.data.price);
        var shares = this.state.sharesToTrade;
        var tradeValue = parsedData * shares;
        this.setState({
          tradeValueCalc: tradeValue,
          pricePerShare: parsedData
        });
        return console.log(this.state.tradeValueCalc);
      });
    }
    if (this.state.selectedTradeType == "Sell") {
      Axios.get(
        `http://localhost:5000/getsymbolinfo/${this.state.selectedSymbol}`
      ).then(res => {
        var parsedData = parseFloat(res.data.price);
        var sharesToSell = 0;
        this.state.saleLots.map(e => {
          sharesToSell = e.value + sharesToSell;
        });
        var tradeValue = sharesToSell * parsedData;
        this.setState({
          tradeValueCalc: tradeValue,
          pricePerShare: parsedData,
          sharesToTrade: sharesToSell
        });
        return console.log(this.state.tradeValueCalc);
      });
    } else return;
  }

  placeTrade() {
    if (this.state.selectedTradeType == "Buy") {
      Axios.put(`http://localhost:5000/purchasecrypto`, {
        user: this.state.currentUser,
        symbol: this.state.selectedSymbol,
        cost_per_unit: this.state.pricePerShare,
        units_purchased: this.state.sharesToTrade
      }).then(res => console.log(res.data));
      return console.log("Buy order successfully entered");
    } else if (this.state.selectedTradeType == "Sell") {
      Axios.put(`http://localhost:5000/sellcrypto`, {
        user: this.state.currentUser,
        symbol: this.state.selectedSymbol,
        share_price: this.state.pricePerShare,
        trade_value_calc: this.state.tradeValueCalc,
        total_shares_being_sold: this.state.sharesToTrade,
        sale_lots: this.state.saleLots
      });
      return console.log("Sell order successfully entered");
    } else console.log("Order was unsuccessful.");
  }

  testRun() {
    console.log(this.state.saleLots);
  }

  render() {
    const columns = [
      {
        title: "Quantity to Sell",
        dataIndex: "units_purchased",
        key: "quantityToSell",
        render: (units_purchased, key) => (
          <span>
            <InputNumber
              min={0}
              max={parseFloat(units_purchased)}
              step={0.5}
              size="small"
              defaultValue="0"
              onChange={e => this.lotsToBeSold(e, key)}
            />
          </span>
        )
      },
      {
        title: "Units held from Purchase",
        dataIndex: "units_purchased",
        key: "units_purchased"
      },
      {
        title: "Acquisition Cost per Unit",
        dataIndex: "cost_per_unit",
        key: "cost_per_unit"
      },
      {
        title: "Date of Purchase",
        dataIndex: "purchase_date_time",
        key: "purchase_date_time"
      }
    ];

    return (
      <div>
        <h1>Trade Page:</h1>
        <br />
        <p>
          {this.state.currentUser}'s current bitcoin balance is: ₿
          {this.state.currentUserBitcoin}
        </p>
        <br />
        <p>Trade Type:</p>
        <Cascader
          options={optionsBuySell}
          placeholder="Buy / Sell"
          onChange={this.tradeTypeInput}
        />
        <br />
        <br />
        <p>Select CryptoCurrency:</p>
        <Cascader
          options={this.state.currencySelection}
          placeholder="Select CryptoCurrency"
          onChange={this.symbolInput}
        />
        <br />
        <br />
        <p>Quantity of Currency:</p>
        {this.state.selectedTradeType == "Buy" ? (
          <InputNumber min={0} onChange={this.shareInput} />
        ) : (
          ""
        )}
        {this.state.selectedTradeType == "Sell" &&
        this.state.selectedSymbol !== "" ? (
          <Table
            columns={columns}
            dataSource={this.state.lotsToLoad}
            size="small"
          />
        ) : (
          ""
        )}
        <br />
        <Button
          onClick={this.calcTradeValue}
          type="primary"
          disabled={
            false
            // this.state.saleLots.length == 0 || this.state.sharesToTrade == 0
            //   ? true
            //   : false //NEEDS TO BE FIXED
          }
        >
          Calculate Trade Value
        </Button>
        <br />
        {this.state.tradeValueCalc !== 0 ? (
          <p>The value of this trade is ₿{this.state.tradeValueCalc}</p>
        ) : (
          ""
        )}
        <br />
        <Button
          onClick={this.placeTrade}
          type="danger"
          disabled={this.state.tradeValueCalc == 0 ? true : false}
        >
          Place Trade
        </Button>
        <Button onClick={this.testRun}>Test Run</Button>
      </div>
    );
  }
}

export default TradePage;
