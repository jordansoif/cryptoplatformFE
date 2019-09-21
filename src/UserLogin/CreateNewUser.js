import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getState } from "Redux";
import store from "/ReduxFolder/reduxStore";
import ReactDOM from "react-dom";
import mountNode from "react-dom";

class CreateNewUser extends React.Component {
  state = { resOutput: "" };

  handleCreateNewUser = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.password === values.passwordConfirm) {
          Axios.post(`http://localhost:5000/auth/createuser`, {
            user_name: values.username,
            password: values.password
          }).then(res => {
            this.setState({ resOutput: res.data });
          });
        } else {
          this.stateState({ resOutput: "Passwords do not match." });
        }
      } else {
        this.stateState({ resOutput: "An Error has occurred." });
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
