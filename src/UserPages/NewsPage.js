import { List, Button } from "antd";
import React from "react";
import { apiRequest } from "../api";

class NewsPage extends React.Component {
  state = {
    fullData: [],
    listData: []
  };

  componentWillMount() {
    apiRequest("get", "data/topstories").then(res => {
      const fullData = res.data.articles.map(e => e.title);
      this.setState({
        fullData,
        listData: fullData.splice(0, 3)
      });
    });
  }

  loadMore = () => {
    const newListData = this.state.fullData.slice(
      0,
      this.state.listData.length + 3
    );
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
