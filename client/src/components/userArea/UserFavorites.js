import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFavEntries } from "../../actions/entryActions";
import Spinner from "../common/Spinner";
import EntryItem from "../entryDisplay/EntryItem";
import NoEntries from "../entryDisplay/NoEntries";

class UserFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favEntries: []
    };
  }
  componentDidMount() {
    this.props.getFavEntries();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.entries.entries && nextProps.entries.entries !== null) {
      this.setState({ favEntries: nextProps.entries.entries });
    }
  }
  render() {
    const { entries, loading } = this.props.entries;
    let display;
    if (entries === null || loading) {
      display = <Spinner />;
    } else if (entries.length === 0) {
      display = <NoEntries />;
    } else {
      display = this.state.favEntries.map(entry => {
        return <EntryItem key={entry._id} entry={entry} />;
      });
    }
    return (
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h1 className="accent-text">My Liked Entries</h1>
          {display}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entries: state.entry
});

UserFavorites.propTypes = {
  entries: PropTypes.object.isRequired,
  getFavEntries: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getFavEntries })(UserFavorites);
