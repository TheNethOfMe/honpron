import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InputTextField from "../formFields/InputTextField";
import { createNewComment } from "../../actions/commentActions";

class CommentWidget extends Component {
  constructor() {
    super();
    this.state = {
      commentText: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log("FIRE");
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const commentData = {
      entryTitle: this.props.entryTitle,
      entryId: this.props.entryId,
      commentText: this.state.commentText
    };
    this.props.createNewComment(commentData);
    this.setState({ commentText: "" });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="card mt-2 display-entry">
        <div className="card-body">
          <h4 className="card-title display-entry_title">Leave a comment.</h4>
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-8">
                <InputTextField
                  placeholder="Write Comment"
                  name="commentText"
                  value={this.state.commentText}
                  onChange={this.onChange}
                  error={errors.commentText}
                />
              </div>
              <div className="col-md-2">
                <button className="btn btn-orange" type="submit">
                  Post
                </button>
              </div>
              <div className="col-md-2">
                <button className="btn btn-snes" type="button">
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

CommentWidget.propTypes = {
  entryTitle: PropTypes.string.isRequired,
  entryId: PropTypes.string.isRequired,
  createNewComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createNewComment })(CommentWidget);
