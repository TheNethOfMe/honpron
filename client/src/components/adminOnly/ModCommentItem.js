import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment, approveComment } from "../../actions/commentActions";

class ModCommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warn: false
    };
    this.warnUser = this.warnUser.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.approve = this.approve.bind(this);
  }
  warnUser() {
    const unWarn = !this.state.warn;
    this.setState({ warn: unWarn });
  }
  onDelete() {
    this.props.deleteComment(this.props.comment._id);
  }
  approve() {
    this.props.approveComment(this.props.comment._id);
  }
  render() {
    const comment = this.props.comment;
    const commentClass = `hp-list_item hp-list_item-padding mt-2 text-center code-${
      comment.commentCode
    }`;
    const warningMsg = (
      <div>
        <p className="warn-text">
          Are you sure you want to delete this comment?
        </p>
        <p className="warn-text">This action cannot be undone.</p>
        <button onClick={this.warnUser} className="btn btn-snes-invert mr-2">
          No, Keep This.
        </button>
        <button onClick={this.onDelete} className="btn btn-snes mr-2">
          Yes, Remove This.
        </button>
      </div>
    );
    return (
      <div className={commentClass}>
        {this.state.warn ? (
          warningMsg
        ) : (
          <div className="row">
            <div className="col-md-8">
              <h5>{comment.entry}</h5>
              <p>
                Posted by <span className="accent-text">{comment.author}</span>{" "}
                on {new Date(comment.commentDate).toLocaleDateString()}
              </p>
              <p className="article-text">{comment.content}</p>
            </div>
            <div className="col-md-4">
              <button onClick={this.approve} className="btn btn-admin mr-4">
                Approve
              </button>
              <button onClick={this.warnUser} className="btn btn-delete mr-4">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ModCommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  approveComment: PropTypes.func.isRequired
};

export default connect(null, { deleteComment, approveComment })(ModCommentItem);
