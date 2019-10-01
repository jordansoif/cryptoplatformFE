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
    let testData = [];
    Axios.put(`http://localhost:5000/data/twodaykline`, {
      symbol: "BTCUSDT"
    }).then(res => {
      console.log(res);
      res.data.map(e => {
        testData.push({ Hours: 0, Price: parseFloat(e[1]) });
      });
      for (let i = 0; i < testData.length; i++) {
        testData[i].Hours = i;
      }
      this.setState({ testData, infoLoadToggle: !this.state.infoLoadToggle });
      console.log(testData);
    });
    return console.log(testData);
  };

  render() {
    return (
      <div>
        <h1>Hello from the Test Page</h1>
        <button onClick={this.placeTrade}>Test Button</button>
        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
          {/* <VictoryAxis
            tickValues={[0]}
          /> */}
          <VictoryAxis
            dependentAxis
            crossAxis
            width={400}
            height={400}
            theme={VictoryTheme.material}
            standalone={false}
          />
          <VictoryLine data={this.state.testData} x="Hours" y="Price" />
        </VictoryChart>
      </div>
    );
  }
}

export default TestPage;

// class App extends React.Component {
//   render() {
//     return (
//       <VictoryChart
//         // adding the material theme provided with Victory
//         theme={VictoryTheme.material}
//         domainPadding={20}
//       >
//         <VictoryAxis
//           tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
//           tickFormat={["1", "2", "3", "4", "5","6","7","8","9","10",]}
//         />
//         <VictoryAxis dependentAxis tickFormat={x => `$${x / 1000}k`} />
//         <VictoryBar data={this.state.testData} x="quarter" y="earnings" />
//       </VictoryChart>
//     );
//   }
// }

// ReactDOM.render(<App />, mountNode);

{
  /* <VictoryAxis
// tickValues={[0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48]}
// tickFormat={[
//   "48",
//   "44",
//   "40",
//   "36",
//   "32",
//   "28",
//   "24",
//   "20",
//   "16",
//   "12",
//   "8",
//   "4",
//   "Now"
// ]}
/>
{/* <VictoryAxis
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
/> */
}
