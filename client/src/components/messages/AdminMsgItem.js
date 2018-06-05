import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class AdminMsgItem extends Component {
  render() {
    const commentClass = `hp-list_item hp-list_item-padding code-${
      this.props.msg.colorCode
    }`;
    const deleteable =
      this.props.msg.closed || this.props.msg.colorCode === "black";
    return (
      <div className={commentClass}>
        <div className="row">
          <div className="col-md-8">
            <h5>
              Submitted by{" "}
              <span className="accent-text">{this.props.msg.sender}</span> on{" "}
              {new Date(this.props.msg.date).toLocaleDateString()}
            </h5>
            <p>
              {this.props.msg.topic}: {this.props.msg.subject}
            </p>
          </div>
          <div className="col-md-4 mt-2">
            <Link
              to={"/get-one-ticket/" + this.props.msg._id}
              className="btn btn-orange"
            >
              Read
            </Link>
            {deleteable && <button className="btn btn-delete">Delete</button>}
          </div>
        </div>
      </div>
    );
  }
}

AdminMsgItem.propTypes = {
  msg: PropTypes.object.isRequired
};

export default connect(null)(AdminMsgItem);
