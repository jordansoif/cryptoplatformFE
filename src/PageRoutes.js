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

const loggedOut = () => {
  return (
    <div>
      <Route component={WrappedNormalLoginForm} exact path="/" />
      <Route component={CreateNewUser} exact path="/createuser" />
      <Route
        component={WrappedChangePasswordForm}
        exact
        path="/changepassword"
      />
    </div>
  );
};

const loggedIn = () => {
  return (
    <div>
      <Route component={NavigationBar} />
      <Route component={HoldingsPage} exact path="/holdings" />
      <Route component={RealizedGainLossPage} exact path="/realizedtrades" />
      <Route component={FundAccount} exact path="/fundaccount" />
      <Route component={TradePage} exact path="/tradepage" />
      <Route component={TestPage} exact path="/testpage" />
    </div>
  );
};

class PageRoutes extends React.Component {
  state = {
    userLoginStatus: false
  };

  loginChange = () => {
    this.setState({ userLoginStatus: !userLoginStatus });
  };

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
          <Route component={TradePage} exact path="/tradepage" />
          <Route component={TestPage} exact path="/testpage" />
          <Route component={WrappedNormalLoginForm} exact path="/" />
          <Route component={CreateNewUser} exact path="/createuser" />
          <Route
            component={WrappedChangePasswordForm}
            exact
            path="/changepassword"
          />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(
  React.createElement(PageRoutes),
  document.getElementById("root")
);
