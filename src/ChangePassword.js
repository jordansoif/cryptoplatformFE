import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import store from "./reduxStore";
import ReactDOM from "react-dom";
import mountNode from "react-dom";

class CreateNewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      passwordConfirm: ""
    };
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangePassword(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.newPassword === values.newPasswordConfirm) {
          Axios.put(`http://localhost:5000/changepassword`, {
            user_name: values.username,
            password: values.currentPassword,
            new_password: values.newPassword
          }).then(res =>
            ReactDOM.render(
              <p>{res.data}</p>,
              document.getElementById("resOutput")
            )
          );
        } else
          ReactDOM.render(
            <p>Passwords do not match.</p>,
            document.getElementById("resOutput")
          );
      } else
        ReactDOM.render(
          <p>An Error has occurred.</p>,
          document.getElementById("resOutput")
        );
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <h1>Change Password</h1>
        <Form onSubmit={this.handleChangePassword} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "Please input a username!" }]
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
            {getFieldDecorator("currentPassword", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Current Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("newPassword", {
              rules: [
                { required: true, message: "Please input a new Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="New Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("newPasswordConfirm", {
              rules: [
                { required: true, message: "Please confirm your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="New Password Confirmation"
              />
            )}
          </Form.Item>
          <div id="resOutput" />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="create-user-form-button"
            >
              Change Password
            </Button>{" "}
            or <a href="/">Back to Login</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedChangePasswordForm = Form.create({ name: "normal_login" })(
  CreateNewUser
);

export default WrappedChangePasswordForm;
