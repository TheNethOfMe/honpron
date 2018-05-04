import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputTextField from "../common/InputTextField";
import TextAreaField from "../common/TextAreaField";
import SelectType from "../common/SelectType";
import { createNewSeries } from "../../actions/seriesActions";

class CreateSeries extends Component {
  constructor() {
    super();
    this.state = {
      seriesType: "video",
      seriesName: "",
      seriesDesc: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newSeries = {
      seriesType: this.state.seriesType,
      seriesName: this.state.seriesName,
      seriesDesc: this.state.seriesDesc
    };
    this.props.createNewSeries(newSeries, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="create-entry">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Series</h1>
              <form onSubmit={this.onSubmit}>
                <InputTextField
                  placeholder="Series name"
                  name="seriesName"
                  value={this.state.seriesName}
                  onChange={this.onChange}
                  error={errors.seriesName}
                />
                <TextAreaField
                  placeholder="Description of new seriers."
                  name="seriesDesc"
                  value={this.state.seriesDesc}
                  onChange={this.onChange}
                  rows="3"
                  error={errors.seriesDesc}
                />
                <SelectType
                  name="seriesType"
                  type={this.state.seriesType}
                  onChange={this.onChange}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateSeries.propTypes = {
  errors: PropTypes.object.isRequired,
  createNewSeries: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createNewSeries })(CreateSeries);
