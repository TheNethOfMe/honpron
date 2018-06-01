import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllEntries } from "../../actions/entryActions";
import Spinner from "../formFields/Spinner";
import EntryItem from "./EntryItem";
import MenuWidget from "./MenuWidget";

class EntryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allVideos: [],
      otherEntries: []
    };
  }
  componentDidMount() {
    this.props.getAllEntries();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.entries.entries && nextProps.entries.entries !== null) {
      const allEntries = nextProps.entries.entries;
      const allVideos = allEntries.filter(entry => {
        return entry.entryType === "video";
      });
      const otherEntries = allEntries.filter(entry => {
        return entry.entryType !== "video";
      });
      this.setState({ allVideos, otherEntries });
    }
  }
  render() {
    const { entries, loading } = this.props.entries;
    let displayMain, displaySmall;
    if (entries === null || loading) {
      displayMain = <Spinner />;
      displaySmall = <Spinner />;
    } else {
      displayMain = this.state.allVideos.map(entry => {
        return <EntryItem key={entry._id} entry={entry} />;
      });
      displaySmall = this.state.otherEntries.map(entry => {
        return <EntryItem key={entry._id} entry={entry} />;
      });
    }
    return (
      <div className="container">
        <div className="row justify-content-center large-only">
          <div className="col-md-8">{displayMain}</div>
          <div className="col-md-4">
            <MenuWidget />
            {displaySmall}
          </div>
        </div>
        <div className="row justify-content-center small-only">
          <div className="col-md-12">
            <MenuWidget />
            {displayMain}
            {displaySmall}
          </div>
        </div>
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
