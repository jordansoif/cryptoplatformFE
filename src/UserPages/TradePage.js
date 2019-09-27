import { Cascader, InputNumber, Button, Table } from "antd";
import React from "react";
import { apiRequest } from "../api";
import { bindActionCreators } from "Redux";
import { connect } from "react-redux";
import { tradeTicketInfo } from "../ReduxFolder/reduxActions";

//Unmount resOutput and error when entering new information

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
  state = {
    currentUser: "",
    currentUserBitcoin: 0,
    sharesToTrade: 0, //share quantity
    selectedTradeType: "", //buy/sell
    selectedSymbol: "", //symbol
    tradeValueCalc: 0, //value to be subtracted/added to cash
    pricePerShare: 0, //share price for buy/sell
    currencySelection: [], //shares shown in currency selector
    lotsToLoad: [], //share lots shown for sale when order/crypto is selected
    saleLots: [], // share lots selected to be sold
    error: null
  };

  componentWillMount() {
    apiRequest("get", "info/getuserbitcoin").then(res =>
      this.setState({ currentUserBitcoin: res.data })
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderType) {
      this.props.history.push("/li/ticket");
    }
    if (nextProps.error) {
      this.setState({
        error: "An error has occurred, the trade was not placed"
      });
    }
  }

  tradeTypeInput = e => {
    if (e[0] == "Buy") {
      var mapCurrency = [];
      apiRequest("get", "data/getallsymbols").then(res => {
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
      apiRequest("get", "trade/getallsymbolholdings").then(res => {
        res.data.map(e =>
          mapCurrency.push({ value: e.symbol, label: e.symbol })
        );
      });
      this.setState({
        currencySelection: mapCurrency,
        selectedTradeType: e[0]
      });
    }
  };

  symbolInput = e => {
    if (this.state.selectedTradeType == "Sell") {
      if (e[0] == undefined) {
        return this.setState({ error: "Please input a trade type." });
      }
      apiRequest("put", "trade/getsymbolpurchaselots", {
        symbol: e[0]
      }).then(res => {
        const removeEmptyLots = res.data.map(e => {
          if (e.units_remaining == 0) {
            return;
          } else return e;
        });
        this.setState({
          lotsToLoad: removeEmptyLots,
          selectedSymbol: e[0],
          saleLots: []
        });
      });
    } else this.setState({ selectedSymbol: e[0] });
  };

  shareInput = e => {
    this.setState({ sharesToTrade: e });
  };

  lotsToBeSold = (e, key) => {
    var copySaleLots = this.state.saleLots; //Runs every Time so copy current saleLots
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
  };

  calcTradeValue = () => {
    apiRequest("put", "data/getsymbolinfo", {
      symbol: this.state.selectedSymbol
    })
      .then(res => {
        if (this.state.selectedTradeType == "Buy") {
          return this.setState({
            tradeValueCalc:
              parseFloat(res.data.price) * this.state.sharesToTrade,
            pricePerShare: parseFloat(res.data.price)
          });
        }
        if (this.state.selectedTradeType == "Sell") {
          var sharesToSell = 0;
          this.state.saleLots.map(e => {
            sharesToSell = e.value + sharesToSell;
          });
          return this.setState({
            tradeValueCalc: sharesToSell * parseFloat(res.data.price),
            pricePerShare: parseFloat(res.data.price),
            sharesToTrade: sharesToSell
          });
        }
      })
      .catch(err => {
        return this.setState({
          error: "An error has occurred in calculating the trade value."
        });
      });
    return;
  };

  placeTrade = () => {
    const { tradeTicketInfo } = this.props;
    tradeTicketInfo(
      this.state.selectedTradeType,
      this.state.selectedSymbol,
      this.state.sharesToTrade,
      this.state.pricePerShare,
      this.state.tradeValueCalc,
      this.state.saleLots
    );
  };

  render() {
    const columns = [
      {
        title: "Quantity to Sell",
        dataIndex: "units_remaining",
        key: "quantityToSell",
        render: (units_remaining, key) => (
          <span>
            <InputNumber
              min={0}
              max={parseFloat(units_remaining)}
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
        dataIndex: "units_remaining",
        key: "units_remaining"
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
        <p>Bitcoin balance is: ₿{this.state.currentUserBitcoin}</p>
        <br />
        <p>Trade Type:</p>
        <Cascader
          options={optionsBuySell}
          placeholder="Buy / Sell"
          onChange={this.tradeTypeInput}
        />

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
            // {  if (this.state.selectedTradeType == "Buy") {if (this.state.sharesToTrade !== 0){return true}} //NEED TO IMPLEMENT THIS ABOVE to setSate for an on/ogg switch for disabled
            //   if (this.state.selectedTradeType == "Sell") {if (this.state.sale_lots.length !== 0){return true}}
            //   else return false}
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
        <p>{this.state.error}</p>
        <Button
          onClick={this.placeTrade}
          type="danger"
          disabled={this.state.tradeValueCalc == 0 ? true : false}
        >
          Place Trade
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ tradeConfirmation }) => ({
  orderType: tradeConfirmation.orderType,
  error: tradeConfirmation.error
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ tradeTicketInfo }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradePage);
