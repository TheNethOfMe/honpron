import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerAdmin } from "../../actions/authActions";

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
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">New Admin</h1>
                <p className="lead text-center">Create a new Admin account</p>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={
                        errors.userName
                          ? "form-control form-control-lg is-invalid"
                          : "form-control form-control-lg"
                      }
                      placeholder="Desired Username"
                      name="userName"
                      value={this.state.userName}
                      onChange={this.onChange}
                    />
                    {errors.userName && (
                      <div className="invalid-feedback">{errors.userName}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className={
                        errors.email
                          ? "form-control form-control-lg is-invalid"
                          : "form-control form-control-lg"
                      }
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={
                        errors.password
                          ? "form-control form-control-lg is-invalid"
                          : "form-control form-control-lg"
                      }
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={
                        errors.password2
                          ? "form-control form-control-lg is-invalid"
                          : "form-control form-control-lg"
                      }
                      placeholder="Confirm Password"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.onChange}
                    />
                    {errors.password2 && (
                      <div className="invalid-feedback">{errors.password2}</div>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Admin.PropTypes = {
  registerAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerAdmin })(withRouter(Admin));
