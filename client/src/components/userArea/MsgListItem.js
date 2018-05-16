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
    const updates = { recipientDelete: true };
    this.props.updateMessage(this.props.msg._id, updates);
  }
  render() {
    const msgLink = `/getMessage/${this.props.msg._id}`;
    const replyTo =
      this.props.useris === "recipient"
        ? this.props.msg.author
        : this.props.msg.recipient;
    const warningMsg = (
      <div>
        <p>Are you sure you want to delete this message?</p>
        <p>This action cannot be undone.</p>
        <button onClick={this.warnUser} className="btn btn-success">
          No, Keep This.
        </button>
        <button onClick={this.onDelete} className="btn btn-dark">
          Yes, Remove This.
        </button>
      </div>
    );
    return (
      <div className="msg-list-item card text-center mt-2">
        <div className="card-body">
          {this.state.warn ? (
            warningMsg
          ) : (
            <div className="row">
              <div className="col-md-8">
                <Link
                  to={{
                    pathname: msgLink,
                    state: { replyTo, userIs: this.props.useris }
                  }}
                >
                  <h5 className="card-title">
                    {this.props.useris === "recipient" &&
                      !this.props.msg.read &&
                      "*NEW* "}
                    {this.props.msg.subject}
                  </h5>
                </Link>
                <p>
                  {this.props.useris === "recipient" ? "From: " : "To: "}
                  {replyTo} <br /> On{" "}
                  {new Date(this.props.msg.date).toLocaleDateString()}
                </p>
              </div>
              <div className="col-md-4">
                <button onClick={this.warnUser} className="btn btn-danger mr-4">
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
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
