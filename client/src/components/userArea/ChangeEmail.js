import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InputTextField from "../formFields/InputTextField";
import { modifyUserEmail } from "../../actions/authActions";

class ChangeEmail extends Component {
  constructor() {
    super();
    this.state = {
      oldEmail: "",
      email: "",
      email2: "",
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
    const updatedEmailData = {
      oldEmail: this.state.oldEmail,
      email: this.state.email,
      email2: this.state.email2
    };
    this.props.modifyUserEmail(updatedEmailData, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="hp-card">
        <h2>Change Email</h2>
        <form noValidate onSubmit={this.onSubmit}>
          <InputTextField
            placeholder="Old Email"
            name="oldEmail"
            value={this.state.oldEmail}
            onChange={this.onChange}
            error={errors.oldEmail}
          />
          <br />
          <InputTextField
            placeholder="New Email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />
          <InputTextField
            placeholder="Verify New Email"
            name="email2"
            value={this.state.email2}
            onChange={this.onChange}
            error={errors.email2}
          />
          <input type="submit" className="btn btn-orange-block btn-block" />
        </form>
      </div>
    );
  }
}

ChangeEmail.propTypes = {
  errors: PropTypes.object.isRequired,
  modifyUserEmail: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { modifyUserEmail })(ChangeEmail);
