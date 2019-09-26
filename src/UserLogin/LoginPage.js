import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { Link } from "react-router-dom";
import * as actions from "../ReduxFolder/reduxActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class LoginPage extends React.Component {
  state = {
    userName: null,
    password: null,
    error: null,
    loading: null
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.props.history.push("/li/home");
    }
    if (nextProps.error) {
      this.setState({ error: nextProps.error });
    }
    if (nextProps.loading) {
      this.setState({ laoding: nextProps.loading });
    }
  }

  handleLogin = e => {
    e.preventDefault();
    const { actions } = this.props;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return this.setState({ error: err });
      }
      return actions.loginUser(values.username, values.password);
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
          <p>{this.state.loading ? "Loading..." : null}</p>
          <p>{this.state.error}</p>
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
  currentUser: loginFeature.currentUser,
  error: loginFeature.error,
  loading: loginFeature.loading
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(LoginPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
