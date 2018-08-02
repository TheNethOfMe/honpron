import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllEntries } from "../../actions/entryActions";
import Spinner from "../common/Spinner";
import EntryItem from "./EntryItem";
import MenuWidget from "./MenuWidget";

class EntryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allEntries: [],
      visableEntries: [],
      newPodcast: null,
      page: 1,
      lastPage: null
    };
    this.paginate = this.paginate.bind(this);
  }
  componentDidMount() {
    this.props.getAllEntries();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.entries.entries && nextProps.entries.entries !== null) {
      const nextEntries = nextProps.entries.entries;
      const allEntries = nextEntries;
      const visableEntries = nextEntries.slice(0, 10);
      const lastPage = Math.ceil(nextEntries.length / 10);
      const newPodcast = allEntries.find(entry => {
        return entry.entryType === "podcast";
      });
      this.setState({
        allEntries,
        lastPage,
        visableEntries,
        newPodcast,
        page: 1
      });
    }
  }
  paginate(direction) {
    const page =
      direction === "forward" ? this.state.page + 1 : this.state.page - 1;
    const indexLastEntry = page * 10;
    const indexFirstEntry = indexLastEntry - 10;
    const visableEntries = this.state.allEntries.slice(
      indexFirstEntry,
      indexLastEntry
    );
    this.setState({ visableEntries, page });
    window.scrollTo(0, 0);
  }
  render() {
    const { entries, loading } = this.props.entries;
    const { page, lastPage, visableEntries, newPodcast } = this.state;
    let displayMain, displaySmall;
    if (entries === null || loading) {
      displayMain = <Spinner />;
      displaySmall = <Spinner />;
    } else {
      displayMain = visableEntries.map(entry => {
        return <EntryItem key={entry._id} entry={entry} />;
      });
      if (newPodcast)
        displaySmall = <EntryItem key={newPodcast._id} entry={newPodcast} />;
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
        <div className="paginator">
          <button
            className="paginator-button"
            disabled={page === 1}
            onClick={() => this.paginate("back")}
          >
            <i className="fas fa-arrow-alt-circle-left" />
          </button>
          <span>Page {page}</span>
          <button
            className="paginator-button"
            disabled={page === lastPage}
            onClick={() => this.paginate("forward")}
          >
            <i className="fas fa-arrow-alt-circle-right" />
          </button>
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

export default connect(
  mapStateToProps,
  { getAllEntries }
)(EntryList);
