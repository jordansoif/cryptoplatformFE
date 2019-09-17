import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css";
import store from "./reduxStore";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import WrappedNormalLoginForm from "./LoginPage";
import CreateNewUser from "./CreateNewUser";
import WrappedChangePasswordForm from "./ChangePassword";
import TestPage from "./TestPage";
import NavigationBar from "./NavigationBar";
import FundAccount from "./FundAccountPage";
import TradePage from "./TradePage";
import HoldingsPage from "./HoldingsPage";
import RealizedGainLossPage from "./RealizedGainLossPage";

class PageRoutes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route component={NavigationBar} />
          <Route component={WrappedNormalLoginForm} exact path="/" />
          <Route component={CreateNewUser} exact path="/createuser" />
          <Route
            component={WrappedChangePasswordForm}
            exact
            path="/changepassword"
          />
          <Route component={HoldingsPage} exact path="/holdings" />
          <Route
            component={RealizedGainLossPage}
            exact
            path="/realizedtrades"
          />
          {/* <Route component={HomePage} exact path="/homepage" /> */}
          <Route component={FundAccount} exact path="/fundaccount" />
          <Route component={TradePage} exact path="/tradepage" />
          <Route component={TestPage} exact path="/testpage" />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(
  React.createElement(PageRoutes),
  document.getElementById("root")
);
