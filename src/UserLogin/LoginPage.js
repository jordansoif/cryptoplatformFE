import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import Axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";
import store from "/ReduxFolder/reduxStore";
import { loginUser } from "/ReduxFolder/reduxActions";
import ReactDOM from "react-dom";
import mountNode from "react-dom";
import WrappedChangePasswordForm from "./ChangePassword";
import cookie from "react-cookies";
import { autoHeader } from "../api";
import { bindActionCreators } from "Redux";
import { connect } from "react-redux";

// const testFunction = (username, password) => {
//   console.log("inside loginUser");
//   return () => {
//     return console.log("inside loginUser 2");
//   };
// };

class LoginPage extends React.Component {
  state = {
    userName: "",
    password: "",
    errorMessage: "",
    loading: "",
    loginError: ""
  };

  handleLogin = e => {
    e.preventDefault();
    console.log("1");
    const { loginUser } = this.props;
    this.props.form.validateFields((err, values) => {
      console.log("2");
      if (err == null) {
        console.log("3");
        const user = values.username;
        const password = values.password;
        console.log("4");
        loginUser(user, password);
        console.log("5");
        this.setState({ errorMessage: err });
        return console.log("6");
      } else return console.log("7");
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <h1>Login Page:</h1>
        <Form onSubmit={this.handleLogin} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <p>{this.state.errorMessage}</p>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <Form.Item>
            <Link to="/changepassword">Change Password </Link>
            or <Link to="/createuser">Register Now!</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginUser }, dispatch);
};

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(LoginPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
