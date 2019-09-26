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
    testData: [],
    infoLoadToggle: false
  };

  placeTrade = () => {
    let dataArray = [];
    Axios.get("http://localhost:5000/data/topstories").then(res => {
      res.data.articles.map(e => dataArray.push(e.title));
      this.setState({ testData: dataArray });
    });
  };

  render() {
    // const data = [
    //   "Racing car sprays burning fuel into crowd.",
    //   "Japanese princess to wed commoner.",
    //   "Australian walks 100km after outback crash.",
    //   "Man charged over missing wedding girl.",
    //   "Los Angeles battles huge wildfires."
    // ];
    return (
      <div>
        <h1>Hello from the Test Page</h1>
        <button onClick={this.placeTrade}>Test Button</button>
        <List
          size="large"
          header={<div>Bitcoin News:</div>}
          bordered
          dataSource={this.state.testData}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    );
  }
}

export default TestPage;

// placeTrade = () => {
//   let testData = [];
//   var i;
//   Axios.put(`http://localhost:5000/data/twodaykline`, {
//     symbol: "BNBBTC"
//   }).then(res => {
//     res.data.map(e => {
//       testData.push({ Hours: 0, Price: e[1] });
//     });
//     for (i = 0; i < testData.length; i++) {
//       testData[47 - i].Hours = i;
//     }
//     this.setState({ testData, infoLoadToggle: !this.state.infoLoadToggle });
//   });
//   return console.log(testData);
// };

{
  /* {this.state.infoLoadToggle == false ? (
          ""
        ) : (
          <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            <VictoryAxis
              tickValues={[0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48]}
              tickFormat={[
                "48",
                "44",
                "40",
                "36",
                "32",
                "28",
                "24",
                "20",
                "16",
                "12",
                "8",
                "4",
                "Now"
              ]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={[
                "48",
                "44",
                "40",
                "36",
                "32",
                "28",
                "24",
                "20",
                "16",
                "12",
                "8",
                "4",
                "Now"
              ]}
            />
            <VictoryLine data={this.state.testData} x="Hours" y="Price" />
          </VictoryChart>
        )} */
}
