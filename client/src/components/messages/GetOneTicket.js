import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import TextAreaField from "../formFields/TextAreaField";
import {
  getOneTicket,
  updateTicket,
  deleteTicket
} from "../../actions/ticketActions";
import { ticketResponse } from "../../actions/msgActions";

class GetOneTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      recipient: "",
      recipientId: "",
      body: "",
      subject: "",
      response: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  componentDidMount() {
    this.props.getOneTicket(this.state.id);
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.tickets.singleTicket &&
      nextProps.tickets.singleTicket !== null
    ) {
      const currentTicket = nextProps.tickets.singleTicket;
      const recipient = currentTicket.sender;
      const recipientId = currentTicket.senderId;
      const subject = "Re: " + currentTicket.topic;
      const body =
        "\nThanks for reaching out to us. \n---Honest Piranha Labs \nPreviously, you wrote: \n" +
        currentTicket.ticketText;
      this.setState({ recipient, recipientId, subject, body });
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
    const newBody = this.state.response + this.state.body;
    const messageData = {
      recipient: this.state.recipient,
      recipientId: this.state.recipientId,
      subject: this.state.subject,
      body: newBody
    };
    const ticketUpdate = {
      responseText: this.state.response,
      closed: true
    };
    this.props.ticketResponse(this.state.id, messageData, ticketUpdate);
  }
  onDelete(e) {
    this.props.deleteTicket(this.state.id, this.props.history);
  }
  onCloseTicket(e) {
    e.prevendDefault();
    this.props.updateTicket(this.state.recipientId, { closed: true });
  }
  render() {
    const { singleTicket, ticketLoading } = this.props.tickets;
    const { errors } = this.state;
    return (
      <div className="row justify-content-center">
        <div className="col-md-10">
          {singleTicket === null || ticketLoading ? (
            <Spinner />
          ) : (
            <div>
              <div className="admin-comment card text-center">
                <div className="card-body">
                  <h4>
                    Submitted by {singleTicket.sender} on{" "}
                    {new Date(singleTicket.date).toLocaleDateString()}
                  </h4>
                  <p>{singleTicket.ticketText}</p>
                  {!singleTicket.closed && (
                    <form onSubmit={this.onSubmit}>
                      <TextAreaField
                        placeholder="Write a response to this user."
                        name="response"
                        value={this.state.response}
                        onChange={this.onChange}
                        rows="3"
                        error={errors.body}
                      />
                      <button type="submit" className="btn btn-orange">
                        Reply and Close
                      </button>
                      {errors.recipient && <p>{errors.recipient}</p>}
                    </form>
                  )}
                  <div>
                    {singleTicket.closed ? (
                      <button
                        onClick={this.onDelete}
                        className="btn btn-delete mt-2"
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        onClick={this.onCloseTicket}
                        className="btn btn-delete mt-2"
                      >
                        Close Without Reply
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets
});

GetOneTicket.propTypes = {
  tickets: PropTypes.object.isRequired,
  getOneTicket: PropTypes.func.isRequired,
  ticketResponse: PropTypes.func.isRequired,
  updateTicket: PropTypes.func.isRequired,
  deleteTicket: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  getOneTicket,
  ticketResponse,
  updateTicket,
  deleteTicket
})(GetOneTicket);
