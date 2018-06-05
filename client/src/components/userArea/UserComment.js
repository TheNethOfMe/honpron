import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/commentActions";

class UserComment extends Component {
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
    this.props.deleteComment(this.props.comment._id);
  }
  render() {
    const comment = this.props.comment;
    const isAdmin = this.props.auth.user.isAdmin || false;
    const userId = this.props.auth.user.id;
    const warningMsg = (
      <div className="hp-warning">
        <p>
          Are you sure you want to delete this comment?
          <br />
          It will no longer appear on the video and this action cannot be
          undone.
        </p>
        <button onClick={this.warnUser} className="btn btn-orange">
          No, Keep This.
        </button>
        <button onClick={this.onDelete} className="btn btn-delete">
          Yes, Remove This.
        </button>
      </div>
    );
    return (
      <div className="hp-list_item pt-1">
        {this.state.warn ? (
          warningMsg
        ) : (
          <div className="row">
            <div className="col-md-8">
              <p>{comment.entry}</p>
              <p className="accent-text">
                You wrote on{" "}
                {new Date(comment.commentDate).toLocaleDateString()}
              </p>
              <p className="article-text">{comment.content}</p>
            </div>
            {(isAdmin || userId === comment.authorId) && (
              <div className="col-md-4">
                <button onClick={this.warnUser} className="btn btn-delete mt-4">
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

UserComment.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(UserComment);
