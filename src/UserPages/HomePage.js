import React from "react";
import Axios from "axios";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

class HomePage extends React.Component {
  state = {
    testData: [],
    infoLoadToggle: false
  };

  componentWillMount() {
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
  }

  render() {
    return (
      <div>
        <h1>Bitcoin 48 hour Price Chart:</h1>
        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
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

export default HomePage;
