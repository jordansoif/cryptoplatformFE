import React from "react";
import {
  Form,
  Input,
  Button,
  Table,
  Popconfirm,
  Divider,
  InputNumber,
  List,
  Typography
} from "antd";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState, bindActionCreators } from "Redux";
import store from "/ReduxFolder/reduxStore";
import ReactDOM from "react-dom";
import mountNode from "react-dom";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

class TestPage extends React.Component {
  state = {
    data: [],
    infoLoadToggle: false
  };

  placeTrade = () => {
    let data = [];
    Axios.put(`http://localhost:5000/data/twodaykline`, {
      symbol: "BTCUSDT"
    }).then(res => {
      console.log(res);
      res.data.map(e => {
        data.push({ Hours: 0, Price: parseFloat(e[1]) });
      });
      for (let i = 0; i < data.length; i++) {
        data[i].Hours = i;
      }
      this.setState({ data, infoLoadToggle: !this.state.infoLoadToggle });
      console.log(data);
    });
    return console.log(data);
  };

  render() {
    return (
      <div>
        <h1>Hello from the Test Page</h1>
        <button onClick={this.placeTrade}>Test Button</button>
        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
          <VictoryAxis
            dependentAxis
            crossAxis
            width={400}
            height={400}
            theme={VictoryTheme.material}
            standalone={false}
          />
          <VictoryLine data={this.state.data} x="Hours" y="Price" />
        </VictoryChart>
      </div>
    );
  }
}

export default TestPage;
