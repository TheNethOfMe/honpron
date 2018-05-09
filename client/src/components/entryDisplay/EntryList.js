import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllEntries } from "../../actions/entryActions";
import Spinner from "../formFields/Spinner";

class EntryList extends Component {
  componentDidMount() {
    this.props.getAllEntries();
  }
  render() {
    const { user } = this.props.auth;
    const { entries, loading } = this.props.entries;
    let listContent;
    if (entries === null || loading) {
      listContent = <Spinner />;
    } else {
      if (entries.length > 0) {
        listContent = <h4>Display Entries Here</h4>;
      } else {
        listContent = (
          <div>
            <p className="lead text-muted">There are no entries to display</p>
          </div>
        );
      }
    }
    return (
      <div>
        <h1>Entry List</h1>
        {listContent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entries: state.entry,
  auth: state.auth
});

EntryList.propTypes = {
  getAllEntries: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  entries: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getAllEntries })(EntryList);
