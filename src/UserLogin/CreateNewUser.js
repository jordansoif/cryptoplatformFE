import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import store from "/ReduxFolder/reduxStore";
import ReactDOM from "react-dom";
import mountNode from "react-dom";
import { apiRequest } from "../api";

class CreateNewUser extends React.Component {
  state = { resOutput: null, error: null };

  //Unmount resOutput and error when entering new information

  handleCreateNewUser = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.password === values.passwordConfirm) {
          apiRequest("post", "auth/createuser", {
            user_name: values.username,
            password: values.password
          })
            .then(res => {
              this.setState({ resOutput: res.data });
            })
            .catch(err => {
              this.setState({
                error: "An error has occurred, please try again."
              });
            });
        } else {
          this.setState({ error: "Passwords do not match." });
        }
      } else {
        this.setState({ error: "An Error has occurred." });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <h1>Create New User</h1>
        <Form onSubmit={this.handleCreateNewUser} className="login-form">
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
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "Please input a Password!" }]
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
          <Form.Item>
            {getFieldDecorator("passwordConfirm", {
              rules: [
                { required: true, message: "Please confirm your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password Confirmation"
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
              Create User
            </Button>{" "}
            or <Link to="/">Back to Login</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedCreateUserForm = Form.create({ name: "normal_login" })(
  CreateNewUser
);

export default WrappedCreateUserForm;
