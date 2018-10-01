import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputTextField from "../formFields/InputTextField";
import TextAreaField from "../formFields/TextAreaField";
import SelectType from "../formFields/SelectType";
import SeriesDropdown from "../formFields/SeriesDropdown";
import Spinner from "../common/Spinner";
import { getSeriesByType } from "../../actions/seriesActions";
import {
  createNewEntry,
  getOneEntry,
  clearEntry,
  updateEntry
} from "../../actions/entryActions";

class CreateEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      entryType: "video",
      description: "",
      series: "",
      youtubeId: "",
      games: "",
      duration: "",
      errors: {},
      id: this.props.match.params.id || null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.state.id) {
      this.props.getOneEntry(this.state.id);
      this.props.getSeriesByType(this.props.location.search.substr(1));
    } else {
      this.props.clearEntry();
      this.props.getSeriesByType("video");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.entry.singleEntry) {
      const oldEntryData = nextProps.entry.singleEntry;
      this.setState(prevState => ({
        ...prevState,
        ...oldEntryData,
        games: oldEntryData.games.join(", ")
      }));
      this.props.clearEntry();
    }
  }
  onChange(e) {
    if (e.target.name === "entryType") {
      this.setState({ entryType: e.target.value });
      this.props.getSeriesByType(e.target.value);
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const entryData = {
      title: this.state.title,
      entryType: this.state.entryType,
      description: this.state.description,
      series: this.state.series,
      youtubeId: this.state.youtubeId,
      games: this.state.games,
      duration: this.state.duration
    };
    if (this.state.id) {
      this.props.updateEntry(this.state.id, entryData, this.props.history);
    } else {
      this.props.createNewEntry(entryData, this.props.history);
    }
  }
  render() {
    const { errors } = this.state;
    const { series, loading } = this.props.series;
    const { entryLoading } = this.props.entry;
    let displayForm;
    if (series === null || loading) {
      displayForm = <Spinner />;
    } else if (!series.length) {
      displayForm = (
        <p>You must create a series before you can create an entry!</p>
      );
    } else {
      displayForm = (
        <SeriesDropdown
          series={series}
          name="series"
          current={this.state.series}
          onChange={this.onChange}
        />
      );
    }
    return (
      <div className="hp-card">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="user-card_title">
              {this.state.id ? "Edit Entry" : "Create Entry"}
            </h1>
            {entryLoading ? (
              <Spinner />
            ) : (
              <form onSubmit={this.onSubmit}>
                <InputTextField
                  placeholder="Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                {!this.state.id && (
                  <SelectType
                    name="entryType"
                    type={this.state.entryType}
                    onChange={this.onChange}
                  />
                )}
                {this.state.entryType === "video" && (
                  <InputTextField
                    placeholder="YouTube ID"
                    name="youtubeId"
                    value={this.state.youtubeId}
                    onChange={this.onChange}
                    error={errors.youtubeId}
                  />
                )}
                {(this.state.entryType === "video" ||
                  this.state.entryType === "podcast") && (
                  <InputTextField
                    placeholder="Video or Podcast Length"
                    name="duration"
                    value={this.state.duration}
                    onChange={this.onChange}
                    error={errors.duration}
                  />
                )}
                <TextAreaField
                  placeholder="Description of new entry."
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  rows="3"
                  error={errors.description}
                />
                <TextAreaField
                  placeholder="List of Games."
                  name="games"
                  value={this.state.games}
                  onChange={this.onChange}
                  rows="2"
                  error={errors.games}
                  info="Separate games with commas. Ex. Game 1, Game 2"
                />
                {displayForm}
                <input
                  type="submit"
                  className="btn btn-orange-block btn-block mt-1"
                />
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

CreateEntry.propTypes = {
  errors: PropTypes.object.isRequired,
  getSeriesByType: PropTypes.func.isRequired,
  series: PropTypes.object.isRequired,
  createNewEntry: PropTypes.func.isRequired,
  entry: PropTypes.object,
  getOneEntry: PropTypes.func.isRequired,
  clearEntry: PropTypes.func.isRequired,
  updateEntry: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  series: state.series,
  errors: state.errors,
  entry: state.entry
});

export default connect(
  mapStateToProps,
  {
    getSeriesByType,
    createNewEntry,
    getOneEntry,
    clearEntry,
    updateEntry
  }
)(CreateEntry);
