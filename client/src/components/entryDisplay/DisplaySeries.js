import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSeriesByType } from "../../actions/seriesActions";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";

class DisplaySeries extends Component {
  componentDidMount() {
    this.props.getSeriesByType(this.props.match.params.type);
  }
  render() {
    const { loading, series } = this.props.series;
    let display;
    if (loading || series === null) {
      display = <Spinner />;
    } else {
      display = series.map(item => {
        return (
          <div className="hp-card hp-card_series" key={item._id}>
            <Link to={`/series/${item.seriesName}`}>
              <h5 className="hp-card_link">{item.seriesName}</h5>
              <p>{item.seriesDesc}</p>
            </Link>
          </div>
        );
      });
    }
    return (
      <div className="container">
        <div className="row justify-content-center large-only">
          <div className="col-md-10">
            <h1 className="accent-text">All {this.props.match.params.type}</h1>
            {display}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  series: state.series
});

DisplaySeries.propTypes = {
  getSeriesByType: PropTypes.func.isRequired,
  series: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getSeriesByType })(DisplaySeries);
