import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "/ReduxFolder/reduxStore";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import WrappedNormalLoginForm from "./UserLogin/LoginPage";
import CreateNewUser from "./UserLogin/CreateNewUser";
import WrappedChangePasswordForm from "./UserLogin/ChangePassword";
import TestPage from "./TestPage";
import NavigationBar from "./NavigationBar";
import FundAccount from "./UserPages/FundAccountPage";
import TradePage from "./UserPages/TradePage";
import HoldingsPage from "./UserPages/HoldingsPage";
import RealizedGainLossPage from "./UserPages/RealizedGainLossPage";
import NewsPage from "./UserPages/NewsPage";
import TradeTicket from "./UserPages/TradeTicket";
import HomePage from "./UserPages/HomePage";

class PageRoutes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route component={WrappedNormalLoginForm} exact path="/" />
          <Route component={CreateNewUser} exact path="/createuser" />
          <Route
            component={WrappedChangePasswordForm}
            exact
            path="/changepassword"
          />
          <Route component={NavigationBar} strict path="/li/" />
          <Route component={HoldingsPage} exact path="/li/holdings" />
          <Route
            component={RealizedGainLossPage}
            exact
            path="/li/realizedtrades"
          />
          <Route component={FundAccount} exact path="/li/fundaccount" />
          <Route component={NewsPage} exact path="/li/news" />
          <Route component={TradePage} exact path="/li/tradepage" />
          <Route component={TestPage} exact path="/li/testpage" />
          <Route component={TradeTicket} exact path="/li/ticket" />
          <Route component={HomePage} exact path="/li/home" />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(
  React.createElement(PageRoutes),
  document.getElementById("root")
);
