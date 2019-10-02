import React from "react";
import Axios from "axios";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

class HomePage extends React.Component {
  state = {
    data: [],
    infoLoadToggle: false
  };

  componentWillMount() {
    let data = [];
    Axios.put(`http://localhost:5000/data/twodaykline`, {
      symbol: "BTCUSDT"
    }).then(res => {
      res.data.map(e => {
        data.push({ Hours: 0, Price: parseFloat(e[1]) });
      });
      for (let i = 0; i < data.length; i++) {
        data[i].Hours = i;
      }
      this.setState({ data, infoLoadToggle: !this.state.infoLoadToggle });
    });
    return;
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
          <VictoryLine data={this.state.data} x="Hours" y="Price" />
        </VictoryChart>
      </div>
    );
  }
}

export default HomePage;
