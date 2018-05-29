import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class ModCommentItem extends Component {
  render() {
    return (
      <div className="admin-comment card mt-2 text-center">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h5 className="admin-title">VIDEO TITLE</h5>
              <p>Posted by USER on DATE</p>
              <p>This is the comment body. A comment body goes here</p>
            </div>
            <div className="col-md-4">
              <button className="btn btn-admin mr-4">Approve</button>
              <button className="btn btn-delete mr-4">Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModCommentItem;
