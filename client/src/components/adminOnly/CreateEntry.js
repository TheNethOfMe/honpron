import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputTextField from "../common/InputTextField";
import TextAreaField from "../common/TextAreaField";
import SelectType from "../common/SelectType";
import { getSeriesByType } from "../../actions/seriesActions";
import { createNewEntry } from "../../actions/entryActions";
import SeriesDropdown from "../common/SeriesDropdown";
import Spinner from "../common/Spinner";

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
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getSeriesByType("video");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "entryType") {
      this.props.getSeriesByType(e.target.value);
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const newEntry = {
      title: this.state.title,
      entryType: this.state.entryType,
      description: this.state.description,
      series: this.state.series,
      youtubeId: this.state.youtubeId,
      games: this.state.games,
      duration: this.state.duration
    };
    this.props.createNewEntry(newEntry, this.props.history);
  }
  render() {
    const { errors } = this.state;
    const { series, loading } = this.props.series;
    let displayForm;
    if (series === null || loading) {
      displayForm = <Spinner />;
    } else {
      displayForm = (
        <SeriesDropdown
          series={series}
          name="series"
          onChange={this.onChange}
        />
      );
    }
    return (
      <div className="create-entry">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1>Create Entry</h1>
              <form onSubmit={this.onSubmit}>
                <InputTextField
                  placeholder="Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <SelectType
                  name="entryType"
                  type={this.state.entryType}
                  onChange={this.onChange}
                />
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
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
  createNewEntry: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  series: state.series,
  errors: state.errors
});

export default connect(mapStateToProps, { getSeriesByType, createNewEntry })(
  CreateEntry
);
