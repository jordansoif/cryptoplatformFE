import { Table, Divider, Tag } from "antd";
import React from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import store from "/ReduxFolder/reduxStore";
import { apiRequest } from "../api";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Home Page:</h1>
        <p>
          Work in Progress. Will be adding 48 hour charts for 3 main currencies
          that user chooses. info to get chart info already set up on backend,
          having difficulty finding a good chart library for setting up the
          charts. Some of the work for the charts is already set up in the test
          page code
        </p>
      </div>
    );
  }
}

export default HomePage;
