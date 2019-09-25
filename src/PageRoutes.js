import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "/ReduxFolder/reduxStore";
import { Provider, connect } from "react-redux";
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
  state = { loggedIn: true };

  // componentWillUpdate() {
  //   if (store.getState().loginFeature.currentUser !== null) {
  //     console.log(store.getState().loginFeature.currentUser);
  //     return this.setState({ loggedIn: true });
  //   }
  // }

  test = () => {
    return this.setState({ loggedIn: !this.state.loggedIn });
  };

  //Find way for props to be accessible on this
  //page so the nav bar can be displayed only when user loggedin

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route component={NavigationBar} />
          <Route component={HoldingsPage} exact path="/holdings" />
          <Route
            component={RealizedGainLossPage}
            exact
            path="/realizedtrades"
          />
          <Route component={FundAccount} exact path="/fundaccount" />
          <Route component={NewsPage} exact path="/news" />
          <Route component={TradePage} exact path="/tradepage" />
          <Route component={TestPage} exact path="/testpage" />
          <Route component={TradeTicket} exact path="/ticket" />
          <Route component={WrappedNormalLoginForm} exact path="/" />
          <Route component={CreateNewUser} exact path="/createuser" />
          <Route component={HomePage} exact path="/home" />
          <Route
            component={WrappedChangePasswordForm}
            exact
            path="/changepassword"
          />
        </Router>
        <button onClick={this.test}>Test button</button>
      </Provider>
    );
  }
}

ReactDOM.render(
  React.createElement(PageRoutes),
  document.getElementById("root")
);
