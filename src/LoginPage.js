import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import Axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./reduxStore";
import ReactDOM from "react-dom";
import mountNode from "react-dom";
import WrappedChangePasswordForm from "./ChangePassword";

const loginUserDispatch = user => {
  return {
    type: "LOGIN",
    currentUser: user
  };
};

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err == null) {
        const user = values.username;
        const password = values.password;
        Axios.get(`http://localhost:5000/userlogin/${user}/${password}`).then(
          res => {
            if (res.data == "User has successfully logged in") {
              store.dispatch(loginUserDispatch(user));
              return this.props.history.push("/homepage");
            } else return;
          }
        );
      }
    });
    return ReactDOM.render(
      <p>An Error has occurred.</p>,
      document.getElementById("resOutput")
    );
  }

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
          <div id="resOutput" />
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <Form.Item>
            <a className="login-form-forgot" href="/changepassword">
              Change Password{" "}
            </a>
            or <a href="/createuser">Register Now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(LoginPage);

export default WrappedNormalLoginForm;