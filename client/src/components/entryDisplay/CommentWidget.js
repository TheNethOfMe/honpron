import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InputTextField from "../formFields/InputTextField";
import { createNewComment } from "../../actions/commentActions";
import { addFav, unFav } from "../../actions/entryActions";

class CommentWidget extends Component {
  constructor() {
    super();
    this.state = {
      commentText: "",
      errors: {},
      alertVisable: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.favorite = this.favorite.bind(this);
    this.unfavorite = this.unfavorite.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log("FIRE");
      this.setState({ errors: nextProps.errors });
    }
  }
  toggleAlert(e) {
    const alertVisable = !this.state.alertVisable;
    this.setState({ alertVisable });
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
    this.toggleAlert();
  }
  favorite(e) {
    this.props.addFav(this.props.entryId);
  }
  unfavorite(e) {
    this.props.unFav(this.props.entryId);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="card mt-2 display-entry">
        <div className="card-body">
          <h4 className="card-title display-entry_title">Leave a comment.</h4>
          <form onSubmit={this.onSubmit}>
            <InputTextField
              placeholder="Write Comment"
              name="commentText"
              value={this.state.commentText}
              onChange={this.onChange}
              error={errors.commentText}
            />
            <button className="btn btn-orange" type="submit">
              Post
            </button>
            {this.props.isFav ? (
              <button
                onClick={this.unfavorite}
                className="btn btn-snes"
                type="button"
              >
                Un-Favorite
              </button>
            ) : (
              <button
                onClick={this.favorite}
                className="btn btn-snes"
                type="button"
              >
                Favorite
              </button>
            )}
            {this.state.alertVisable && (
              <div
                className="alert alert-warning alert-dismissible fade show mt-2"
                role="alert"
              >
                <strong>Thanks!</strong> Your comment will appear below once
                it's approved.
                <button
                  type="button"
                  className="close"
                  onClick={this.toggleAlert}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

CommentWidget.propTypes = {
  entryTitle: PropTypes.string.isRequired,
  entryId: PropTypes.string.isRequired,
  createNewComment: PropTypes.func.isRequired,
  addFav: PropTypes.func.isRequired,
  isFav: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createNewComment, addFav, unFav })(
  CommentWidget
);
