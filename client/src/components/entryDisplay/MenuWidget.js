import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class MenuWidget extends Component {
  render() {
    const entry = this.props.entry;
    return (
      <div className="card entry-item mb-2">
        <div className="card-body text-left widget-items">
          <p>Videos</p>
          <p className="widget-item_secondary">SNEScapades</p>
          <p className="widget-item_secondary">Summer StarTropics</p>
          <p className="widget-item_secondary">All Video Series</p>
          <p>Podcasts</p>
          <p className="widget-item_secondary">Anything But Tangerines</p>
          <p className="widget-item_secondary">Controllers Down</p>
          <p className="widget-item_secondary">All Podcast Series</p>
          <p>SNES Rankings</p>
          <p>More Info</p>
        </div>
      </div>
    );
  }
}

export default connect()(MenuWidget);
