import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllEntries } from "../../actions/entryActions";
import Spinner from "../formFields/Spinner";
import AdminEntryItem from "./AdminEntryItem";

class AdminEntryList extends Component {
  componentDidMount() {
    this.props.getAllEntries();
  }
  render() {
    const { entries, entryLoading } = this.props.entry;
    let display;
    if (entries === null || entryLoading) {
      display = <Spinner />;
    } else {
      display = entries.map(entry => {
        return (
          <AdminEntryItem
            key={entry._id}
            entry={entry}
            history={this.props.history}
          />
        );
      });
    }
    return (
      <div>
        <h2 className="admin-title">Edit or Delete Entries</h2>
        {display}
      </div>
    );
  }
}

AdminEntryList.propTypes = {
  entry: PropTypes.object.isRequired,
  getAllEntries: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  entry: state.entry
});

export default connect(mapStateToProps, { getAllEntries })(AdminEntryList);
