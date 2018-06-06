import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import Modal from "../layout/Modal";
import { readMessage, updateMessage } from "../../actions/msgActions";
import { blockUser } from "../../actions/authActions";

class GetOneMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      replyTo: this.props.location.state.replyTo,
      userIs: this.props.location.state.userIs
    };
    this.onDelete = this.onDelete.bind(this);
    this.blockUser = this.blockUser.bind(this);
  }
  componentDidMount() {
    this.props.readMessage(this.state.id);
  }
  onDelete() {
    let updates;
    if (this.state.userIs === "recipient") updates = { recipientDelete: true };
    if (this.state.userIs === "author") updates = { authorDelete: true };
    this.props.updateMessage(this.state.id, updates);
    this.props.history.push("/get-messages");
  }
  blockUser() {
    let userToBlock, blockUser;
    if (this.state.userIs === "recipient") {
      blockUser = `${this.props.messages.singleMsg.authorId}!${
        this.props.messages.singleMsg.author
      }`;
      userToBlock = { blockUser };
    }
    if (this.state.userIs === "author") {
      blockUser = `${this.props.messages.singleMsg.recipientId}!${
        this.props.messages.singleMsg.recipient
      }`;
      userToBlock = { blockUser };
    }
    this.props.blockUser(userToBlock, this.props.history);
  }
  render() {
    const { singleMsg, msgLoading } = this.props.messages;
    return (
      <div className="hp-card">
        {singleMsg === null || msgLoading ? (
          <Spinner />
        ) : (
          <div>
            <h1>{singleMsg.subject}</h1>
            <h4>
              From: <span className="accent-text">{singleMsg.author}</span>{" "}
              {this.state.userIs === "recipient" &&
                singleMsg.authorId !== "Admin" && (
                  <button onClick={this.blockUser} className="btn btn-snes">
                    Block Sender
                  </button>
                )}
              <br />To:{" "}
              <span className="accent-text">{singleMsg.recipient}</span>
              {this.state.userIs === "author" && (
                <button onClick={this.blockUser} className="btn btn-snes">
                  Block Recipient
                </button>
              )}
              <br />
              <small>On {new Date(singleMsg.date).toLocaleDateString()}</small>
            </h4>
            <div className="hp-message_text">
              {singleMsg.body.split("\n").map((line, i) => {
                return (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                );
              })}
            </div>
            <div>
              <Link
                to={{
                  pathname: "/send-message",
                  state: {
                    recipient: this.state.replyTo,
                    subject: `Re: ${singleMsg.subject}`
                  }
                }}
              >
                {singleMsg.authorId !== "Admin" && (
                  <button className="btn btn-snes">Reply</button>
                )}
              </Link>
              <Link to="/get-messages">
                <button className="btn btn-orange">Return to Inbox</button>
              </Link>
              <button
                type="button"
                className="btn btn-delete"
                data-toggle="modal"
                data-target="#verifyDelete"
              >
                Delete Message
              </button>
              <Modal
                modalId="verifyDelete"
                title="Confirm Delete Message"
                bodyText="Are you sure you want to delete this message? This cannot be undone. Please note that messages you send are not unsent if you delete them."
                cancelText="No, Keep This"
                confirmAction={this.onDelete}
                confirmText="Yes, Delete This"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

GetOneMessage.propTypes = {
  readMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  blockUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(mapStateToProps, {
  readMessage,
  updateMessage,
  blockUser
})(GetOneMessage);
