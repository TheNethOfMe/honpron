import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { updateMessage } from "../../actions/msgActions";

class MsgListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warn: false
    };
    this.warnUser = this.warnUser.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  warnUser() {
    const unWarn = !this.state.warn;
    this.setState({ warn: unWarn });
  }
  onDelete() {
    let updates;
    if (this.props.useris === "recipient") updates = { recipientDelete: true };
    if (this.props.useris === "author") updates = { authorDelete: true };
    this.props.updateMessage(this.props.msg._id, updates);
  }
  render() {
    const msgLink = `/get-message/${this.props.msg._id}`;
    const replyTo =
      this.props.useris === "recipient"
        ? this.props.msg.author
        : this.props.msg.recipient;
    const warningMsg = (
      <div className="hp-warning p-2">
        <p>
          Are you sure you want to delete this message?<br />This action cannot
          be undone.
        </p>
        <button onClick={this.warnUser} className="btn btn-orange mr-2">
          No, Keep This.
        </button>
        <button onClick={this.onDelete} className="btn btn-delete">
          Yes, Remove This.
        </button>
      </div>
    );
    return (
      <div
        className={
          this.props.useris === "recipient" && !this.props.msg.read
            ? "hp-list_item hp-unread"
            : "hp-list_item hp-message"
        }
      >
        {this.state.warn ? (
          warningMsg
        ) : (
          <div className="row">
            <div className="col-md-8 p-2">
              <Link
                to={{
                  pathname: msgLink,
                  state: { replyTo, userIs: this.props.useris }
                }}
              >
                <h5 className="hp-card_link">
                  {this.props.useris === "recipient" &&
                    !this.props.msg.read &&
                    "*NEW* "}
                  {this.props.msg.subject}
                </h5>
              </Link>
              <p>
                {this.props.useris === "recipient" ? "From: " : "To: "}
                {replyTo}
                <br /> On {new Date(this.props.msg.date).toLocaleDateString()}
              </p>
            </div>
            <div className="col-md-4">
              <button
                onClick={this.warnUser}
                className="btn btn-delete mr-4 mt-4"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

MsgListItem.propTypes = {
  msg: PropTypes.object.isRequired,
  updateMessage: PropTypes.func.isRequired,
  useris: PropTypes.string.isRequired
};

export default connect(null, { updateMessage })(MsgListItem);
