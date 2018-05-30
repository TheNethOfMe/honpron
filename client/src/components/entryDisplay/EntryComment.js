import React, { Component } from "react";

class EntryComment extends Component {
  render() {
    return (
      <div className="entry-item_comment card mt-2">
        <div className="card-body">
          <p className="entry-item_title card-title">AUTHOR wrote on DATE</p>
          <p className="card-text display-entry_text mr-4">
            ----This is the comment body
          </p>
        </div>
      </div>
    );
  }
}

export default EntryComment;
