import React, { Component } from "react";
import PropTypes from "prop-types";

class EntryComment extends Component {
  render() {
    const comment = this.props.comment;
    return (
      <div className="entry-item_comment card mt-2">
        <div className="card-body">
          <p className="entry-item_title card-title">
            {comment.author} wrote on{" "}
            {new Date(comment.commentDate).toLocaleDateString()}
          </p>
          <p className="card-text display-entry_text mr-4">{comment.content}</p>
        </div>
      </div>
    );
  }
}

EntryComment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default EntryComment;
