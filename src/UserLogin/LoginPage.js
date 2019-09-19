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

class LoginPage extends React.Component {
  state = {
    userName: "",
    password: "",
    errorMessage: "",
    loading: "",
    loginError: ""
  };

  // handleLogin = e => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (err == null) {
  //       const user = values.username;
  //       const password = values.password;
  //       autoHeader("post", "auth/login", {
  //         user_name: user,
  //         password: password
  //       }).then(res => {
  //         if (res.data.access_token) {
  //           cookie.save("token", res.data.access_token);
  //           store.dispatch(loginUserDispatch(user));
  //           return this.props.history.push("/homepage");
  //         } else
  //           return this.setState({ errorMessage: "An error has occurred." });
  //       });
  //     } else {
  //       return this.setState({ errorMessage: err });
  //     }
  //   });
  // };

  handleLogin = e => {
    e.preventDefault();
    const { loginUser } = this.props;
    console.log("1");
    this.props.form.validateFields((err, values) => {
      if (err == null) {
        console.log("2");
        const user = values.username;
        const password = values.password;
        Axios.post(`http://localhost:5000/auth/login`, {
          user_name: values.username,
          password: values.password
        })
          .then(res => {
            console.log("3");
            if (res.data.access_token) {
              console.log("4");
              cookie.save("token", res.data.access_token);
              loginUser(user, password); //This is broken
              return this.props.history.push("/homepage");
            } else
              return (
                console.log("5"),
                this.setState({ errorMessage: "An error has occurred." })
              );
          })
          .catch(err => {
            console.log("6");
            this.setState({ errorMessage: err });
          });
      } else {
        return console.log("7"), this.setState({ errorMessage: err });
      }
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
          <p>{this.state.loading}</p>
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
