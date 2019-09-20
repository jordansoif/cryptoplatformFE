import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import Axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";
import store from "/ReduxFolder/reduxStore";
import * as actions from "../ReduxFolder/reduxActions";
import ReactDOM from "react-dom";
import mountNode from "react-dom";
import WrappedChangePasswordForm from "./ChangePassword";
import cookie from "react-cookies";
import { apiRequest } from "../api";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class LoginPage extends React.Component {
  state = {
    userName: "",
    password: "",
    errorMessage: "",
    loading: this.props.loading,
    loginError: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.props.history.push("/home");
    }
  }

  handleLogin = e => {
    e.preventDefault();
    const { actions } = this.props;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const user = values.username;
      const password = values.password;
      actions.loginUser(user, password);
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
          <p>{this.state.loading == true ? "Loading..." : ""}</p>
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

const mapStateToProps = ({ loginFeature }) => ({
  currentUser: loginFeature.currentUser
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(LoginPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
