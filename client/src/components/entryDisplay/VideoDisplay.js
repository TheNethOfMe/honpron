import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class VideoDisplay extends Component {
  render() {
    const videoSrc = `https://www.youtube.com/embed/${this.props.ytid}`;
    return (
      <div className="video-wrapper">
        <iframe
          width="560"
          height="349"
          src={videoSrc}
          frameBorder="0"
          title={this.props.title}
          allowFullScreen
        />
      </div>
    );
  }
}

VideoDisplay.propTypes = {
  ytid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default connect(null)(VideoDisplay);
