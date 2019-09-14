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
    this.state = {};
    this.handleCreateNewUser = this.handleCreateNewUser.bind(this);
  }

  handleCreateNewUser(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.password === values.passwordConfirm) {
          Axios.post(`http://localhost:5000/createuser`, {
            user_name: values.username,
            password: values.password
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
          <div id="resOutput" />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="create-user-form-button"
            >
              Create User
            </Button>{" "}
            or <a href="/">Back to Login</a>
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
