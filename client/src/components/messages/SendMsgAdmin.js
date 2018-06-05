import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InputTextField from "../formFields/InputTextField";
import TextAreaField from "../formFields/TextAreaField";
import TopicDropdown from "../formFields/TopicDropdown";
import { contactUs } from "../../actions/ticketActions";

class SendMsgAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      topic: "",
      ticketText: "",
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
    const newTicket = {
      subject: this.state.subject,
      topic: this.state.topic,
      ticketText: this.state.ticketText
    };
    this.props.contactUs(newTicket);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="hp-card">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1>Send Message to Honest Piranha</h1>
            <form onSubmit={this.onSubmit}>
              <InputTextField
                placeholder="Subject"
                name="subject"
                value={this.state.subject}
                onChange={this.onChange}
                error={errors.subject}
              />
              <TopicDropdown name="topic" onChange={this.onChange} />
              <TextAreaField
                placeholder="Compose your message."
                name="ticketText"
                value={this.state.ticketText}
                onChange={this.onChange}
                rows="3"
                error={errors.ticketText}
              />
              <input type="submit" className="btn btn-orange-block btn-block" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

SendMsgAdmin.propTypes = {
  contactUs: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { contactUs })(SendMsgAdmin);
