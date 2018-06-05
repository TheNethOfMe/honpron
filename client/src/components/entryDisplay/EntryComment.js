import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/commentActions";

class EntryComment extends Component {
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
      <div>
        <p className="hp-warning">
          Are you sure you want to delete this comment?
        </p>
        <p className="hp-warning">This action cannot be undone.</p>
        <button onClick={this.warnUser} className="btn btn-snes-invert mr-2">
          No, Keep This.
        </button>
        <button onClick={this.onDelete} className="btn btn-snes mr-2">
          Yes, Remove This.
        </button>
      </div>
    );
    return (
      <div className="entry-item_comment card mt-2">
        <div className="card-body">
          {this.state.warn ? (
            warningMsg
          ) : (
            <div className="row">
              <div className="col-md-8">
                <p className="entry-item_title card-title">
                  {comment.author} wrote on{" "}
                  {new Date(comment.commentDate).toLocaleDateString()}
                </p>
                <p className="card-text display-entry_text mr-4">
                  {comment.content}
                </p>
              </div>
              {(isAdmin || userId === comment.authorId) && (
                <div className="col-md-4">
                  <button onClick={this.warnUser} className="btn btn-delete">
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

EntryComment.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(EntryComment);
