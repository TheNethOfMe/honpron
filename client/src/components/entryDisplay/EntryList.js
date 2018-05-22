import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllEntries } from "../../actions/entryActions";
import Spinner from "../formFields/Spinner";
import EntryItem from "./concept1/EntryItem";
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
      const newEntries = nextProps.entries.entries;
      const allVideos = newEntries.filter(entry => {
        return entry.entryType === "video";
      });
      const otherEntries = newEntries.filter(entry => {
        return entry.entryType !== "video";
      });
      this.setState({ allVideos, otherEntries });
    }
  }
  render() {
    const { entries, loading } = this.props.entries;
    let displayMain;
    let displaySmall;
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
      <div className="row justify-content-center">
        <div className="col-md-7">{displayMain}</div>
        <div className="col-md-3">
          <MenuWidget />
          {displaySmall}
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
