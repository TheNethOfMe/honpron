import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getEntriesBySeries } from "../../actions/entryActions";
import Spinner from "../common/Spinner";
import EntryItem from "./EntryItem";
import MenuWidget from "./MenuWidget";

class EntryListSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allEntries: [],
      visableEntries: [],
      currentPath: this.props.location.pathname,
      page: 1,
      lastPage: null
    };
    this.paginate = this.paginate.bind(this);
  }
  componentDidMount() {
    this.props.getEntriesBySeries(this.props.match.params.series);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.entries.entries && nextProps.entries.entries !== null) {
      const nextEntries = nextProps.entries.entries;
      const allEntries = nextEntries;
      const visableEntries = nextEntries.slice(0, 10);
      const lastPage = Math.ceil(nextEntries.length / 10);
      this.setState({ allEntries, lastPage, visableEntries, page: 1 });
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.currentPath !== nextProps.location.pathname) {
      this.setState({ currentPath: nextProps.location.pathname });
      this.props.getEntriesBySeries(this.props.match.params.series);
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
    const { page, lastPage } = this.state;
    let displayMain;
    if (entries === null || loading) {
      displayMain = <Spinner />;
    } else {
      displayMain = this.state.visableEntries.map(entry => {
        return <EntryItem key={entry._id} entry={entry} />;
      });
    }
    return (
      <div className="container">
        <div className="row justify-content-center large-only">
          <div className="col-md-8">{displayMain}</div>
          <div className="col-md-4">
            <MenuWidget />
          </div>
        </div>
        <div className="row justify-content-center small-only">
          <div className="col-md-12">
            <MenuWidget />
            {displayMain}
          </div>
        </div>
        <div className="paginator">
          <button
            className="paginator-button"
            disabled={page === 1}
            onClick={() => this.paginate("back")}
          >
            <i class="fas fa-arrow-alt-circle-left" />
          </button>
          <span>Page {page}</span>
          <button
            className="paginator-button"
            disabled={page === lastPage}
            onClick={() => this.paginate("forward")}
          >
            <i class="fas fa-arrow-alt-circle-right" />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entries: state.entry
});

EntryListSeries.propTypes = {
  getEntriesBySeries: PropTypes.func.isRequired,
  entries: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getEntriesBySeries }
)(EntryListSeries);
