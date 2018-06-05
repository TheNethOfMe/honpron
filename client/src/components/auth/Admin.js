import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerAdmin } from "../../actions/authActions";
import InputTextField from "../formFields/InputTextField";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newAdmin = {
      name: this.state.name,
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerAdmin(newAdmin, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="hp-card">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="user-card_title">New Admin</h1>
              <p className="lead text-center">Create a new Admin account</p>

              <form noValidate onSubmit={this.onSubmit}>
                <InputTextField
                  placeholder="Username"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.onChange}
                  error={errors.userName}
                />
                <InputTextField
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <InputTextField
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <InputTextField
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input
                  type="submit"
                  className="btn btn-orange-block btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  registerAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerAdmin })(withRouter(Admin));
