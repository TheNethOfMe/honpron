import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class CreateEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      dateAdded: "",
      entryType: "video",
      description: "",
      series: "",
      youtubeId: "",
      games: "",
      duration: "",
      blog: {},
      errors: {}
    };
  }
  render() {
    return <div />;
  }
}

const mapStateToProps = ()

export default connect(null)(CreateEntry);
