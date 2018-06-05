import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputTextField from "../formFields/InputTextField";
import TextAreaField from "../formFields/TextAreaField";
import { createNewMessage } from "../../actions/msgActions";

class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: this.props.location.state.recipient || "",
      subject: this.props.location.state.subject || "",
      body: "",
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
    const newMessage = {
      recipient: this.state.recipient,
      subject: this.state.subject,
      body: this.state.body
    };
    this.props.createNewMessage(newMessage, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="hp-card">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1>Send Message to a User</h1>
            <form onSubmit={this.onSubmit}>
              <InputTextField
                placeholder="Enter Recipient"
                name="recipient"
                value={this.state.recipient}
                onChange={this.onChange}
                error={errors.recipient}
              />
              <InputTextField
                placeholder="Subject"
                name="subject"
                value={this.state.subject}
                onChange={this.onChange}
                error={errors.subject}
              />
              <TextAreaField
                placeholder="Compose your message."
                name="body"
                value={this.state.body}
                onChange={this.onChange}
                rows="3"
                error={errors.body}
              />
              <input
                type="submit"
                className="btn btn-orange-block btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SendMessage.propTypes = {
  errors: PropTypes.object.isRequired,
  createNewMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, {
  createNewMessage
})(SendMessage);
