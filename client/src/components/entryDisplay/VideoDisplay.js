import React, { Component } from "react";
import PropTypes from "prop-types";

class VideoDisplay extends Component {
  render() {
    const videoSrc = `https://www.youtube.com/embed/${this.props.ytid}`;
    return (
      <div className="video-wrapper">
        <iframe
          width="560"
          height="349"
          src={videoSrc}
          frameborder="0"
          title={this.props.title}
          allowfullscreen
        />
      </div>
    );
  }
}

VideoDisplay.propTypes = {
  ytid: PropTypes.string.isRequried,
  title: PropTypes.string.isRequried
};

export default VideoDisplay;
