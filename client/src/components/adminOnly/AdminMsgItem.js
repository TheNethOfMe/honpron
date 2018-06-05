import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class AdminMsgItem extends Component {
  render() {
    const commentClass = `admin-comment card mt-2 text-center code-${
      this.props.msg.colorCode
    }`;
    const deleteable =
      this.props.msg.closed || this.props.msg.colorCode === "black";
    return (
      <div className={commentClass}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h4>
                Submitted by {this.props.msg.sender} on{" "}
                {new Date(this.props.msg.date).toLocaleDateString()}
              </h4>
              <h5>{this.props.msg.topic}</h5>
            </div>
            <div className="col-md-4">
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
      </div>
    );
  }
}

AdminMsgItem.propTypes = {
  msg: PropTypes.object.isRequired
};

export default connect(null)(AdminMsgItem);
