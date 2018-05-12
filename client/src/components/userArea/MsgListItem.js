import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class MsgListItem extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="msg-list-item">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h5 className="card-title">{this.props.msg.subject}</h5>
              <h5>
                From: {this.props.msg.author} To: {this.props.msg.recipient}
              </h5>
              <p className="card-text">{this.props.msg.body}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MsgListItem.propTypes = {
  msg: PropTypes.object.isRequired
};

export default connect(null)(MsgListItem);
