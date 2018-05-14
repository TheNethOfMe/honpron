import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { updateMessage } from "../../actions/msgActions";

class MsgListItemRecieved extends Component {
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
                <Link to="/getMessages">
                  <h5 className="card-title">{this.props.msg.subject}</h5>
                </Link>
                <p>From: {this.props.msg.author}</p>
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

MsgListItemRecieved.propTypes = {
  msg: PropTypes.object.isRequired,
  updateMessage: PropTypes.func.isRequired
};

export default connect(null, { updateMessage })(MsgListItemRecieved);