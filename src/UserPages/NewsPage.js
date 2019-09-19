import { Menu, Icon, List, Button } from "antd";
import React from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import store from "/ReduxFolder/reduxStore";
import { thisExpression } from "@babel/types";

class NewsPage extends React.Component {
  state = {
    fullData: [],
    listData: []
  };

  componentWillMount() {
    let dataArray = [];
    Axios.get("http://localhost:5000/altapi/topstories").then(res => {
      res.data.articles.map(e => dataArray.push(e.title));
      this.setState({
        fullData: dataArray,
        listData: [dataArray[0], dataArray[1], dataArray[2]]
      });
    });
  }

  loadMore = () => {
    let newListData = this.state.listData;
    const currentLength = this.state.listData.length;
    this.state.fullData
      .slice(currentLength, currentLength + 3)
      .map(e => newListData.push(e));
    this.setState({ listData: newListData });
  };

  render() {
    return (
      <div>
        <h1>News Page:</h1>
        <List
          size="large"
          header={<div>Bitcoin News:</div>}
          footer={
            <Button onClick={this.loadMore} type="primary">
              Load More
            </Button>
          }
          bordered
          dataSource={this.state.listData}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    );
  }
}

export default NewsPage;
