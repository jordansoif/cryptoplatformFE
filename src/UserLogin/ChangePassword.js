import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import ReactDOM from "react-dom";
import mountNode from "react-dom";
import { apiRequest } from "../api";

//Unmount resOutput and error when entering new information

class ChangePassword extends React.Component {
  state = {
    error: null,
    resOutput: null
  };

  handleChangePassword = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.newPassword === values.newPasswordConfirm) {
          apiRequest("put", "auth/changepassword", {
            user_name: values.username,
            password: values.currentPassword,
            new_password: values.newPassword
          })
            .then(res => {
              this.setState({ resOutput: res.data });
            })
            .catch(err => {
              this.setState({
                error: "An error has occurred, please try again."
              });
            });
        } else this.setState({ error: "Passwords do not match." });
      } else this.setState({ error: "An Error has occurred." });
    });
  };

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
          <p>{this.state.resOutput}</p>
          <p>{this.state.error}</p>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="create-user-form-button"
            >
              Change Password
            </Button>{" "}
            or <Link to="/">Back to Login</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedChangePasswordForm = Form.create({ name: "normal_login" })(
  ChangePassword
);

export default WrappedChangePasswordForm;
