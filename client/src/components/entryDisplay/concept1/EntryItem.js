import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class EntryItem extends Component {
  render() {
    const entry = this.props.entry;
    return (
      <div className="card entry-item">
        <div className="card-body">
          <p className="text-muted text-left">{entry.series}</p>
          <img
            className="card-img-top"
            src="https://picsum.photos/200/?random"
            style={{ width: "90%" }}
            alt="Example"
          />
          <h5 className="card-title pt-2 entry-item_title">{entry.title}</h5>
          <p className="card-text entry-item_text">{entry.description}</p>
        </div>
      </div>
    );
  }
}

EntryItem.propTypes = {
  entry: PropTypes.object.isRequired
};

export default connect()(EntryItem);
