import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import InputTextField from "../formFields/InputTextField";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      userName: this.state.userName,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="hp-card">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1>Log In</h1>
            <p className="lead text-center">
              Sign in to your Honest Piranha user account
            </p>
            {errors.alert && (
              <div className="alert alert-danger">{errors.alert}</div>
            )}
            <form onSubmit={this.onSubmit}>
              <InputTextField
                placeholder="Username"
                name="userName"
                value={this.state.userName}
                onChange={this.onChange}
                error={errors.userName}
              />
              <InputTextField
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />
              <input type="submit" className="btn btn-orange-block btn-block" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
