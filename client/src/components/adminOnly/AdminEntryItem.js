import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteEntry } from "../../actions/entryActions";

class AdminEntryItem extends Component {
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
    this.props.deleteEntry(this.props.entry._id, this.props.history);
  }
  render() {
    const warningMsg = (
      <div>
        <p className="hp-warning">
          Are you sure you want to delete the {this.props.entry.entryType}{" "}
          {this.props.entry.title}?
        </p>
        <p className="hp-warning">This action cannot be undone.</p>
        <button onClick={this.warnUser} className="btn btn-snes mr-2">
          No, Keep This.
        </button>
        <button onClick={this.onDelete} className="btn btn-delete mr-2">
          Yes, Remove This.
        </button>
      </div>
    );
    return (
      <div className="hp-list_item hp-list_item-padding">
        {this.state.warn ? (
          warningMsg
        ) : (
          <div className="row">
            <div className="col-md-8">
              <h5>
                <span className="accent-text">{this.props.entry.title}</span>
                <small>
                  {" "}
                  <span className="purple-text">
                    {this.props.entry.entryType}
                  </span>
                </small>
              </h5>
              <p>{this.props.entry.description}</p>
            </div>
            <div className="col-md-4">
              <Link
                to={{
                  pathname: `/update-entry/${this.props.entry._id}`,
                  search: this.props.entry.entryType
                }}
                className="btn btn-snes"
              >
                Edit
              </Link>
              <button onClick={this.warnUser} className="btn btn-delete">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

AdminEntryItem.propTypes = {
  entry: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(null, { deleteEntry })(AdminEntryItem);
