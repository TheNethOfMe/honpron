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
      entries: []
    };
  }
  componentDidMount() {
    this.props.getEntriesBySeries(this.props.match.params.series);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.entries.entries && nextProps.entries.entries !== null) {
      const entries = nextProps.entries.entries;
      this.setState({ entries });
    }
  }
  render() {
    const { entries, loading } = this.props.entries;
    let displayMain;
    if (entries === null || loading) {
      displayMain = <Spinner />;
    } else {
      displayMain = this.state.entries.map(entry => {
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

export default connect(mapStateToProps, { getEntriesBySeries })(
  EntryListSeries
);
