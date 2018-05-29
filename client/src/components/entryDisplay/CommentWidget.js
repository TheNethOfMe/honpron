import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InputTextField from "../formFields/InputTextField";

class CommentWidget extends Component {
  constructor() {
    super();
    this.state = {
      commentText: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div className="card mt-2 display-entry">
        <div className="card-body">
          <h4 className="card-title display-entry_title">Leave a comment.</h4>
          <form>
            <div className="row">
              <div className="col-md-8">
                <InputTextField
                  placeholder="Write Comment"
                  name="commentText"
                  value={this.state.commentText}
                  onChange={this.onChange}
                  error=""
                />
              </div>
              <div className="col-md-2">
                <button className="btn btn-success" type="submit">
                  Post
                </button>
              </div>

              <div className="col-md-2">
                <button className="btn btn-info" type="button">
                  Favorite
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null)(CommentWidget);
