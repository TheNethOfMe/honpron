import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class MenuWidget extends Component {
  render() {
    return (
      <div className="entry-item_widget mb-2">
        <div className="card-body text-left widget-items">
          <Link to="/type/video">
            <p className="widget-items_primary">All Videos</p>
          </Link>
          <Link to="/series/SNEScapades">
            <p className="widget-item_secondary">SNEScapades</p>
          </Link>
          <Link to="/series/Summer StarTropics">
            <p className="widget-item_secondary">Summer StarTropics</p>
          </Link>
          <Link to="/series/Other Videos">
            <p className="widget-item_secondary">Other Videos</p>
          </Link>
          {/*
          <Link to="/type/podcast">
            <p className="widget-items_primary">Podcasts</p>
          </Link>
          <Link to="/series/Anything But Tangerines">
            <p className="widget-item_secondary">Anything But Tangerines</p>
          </Link>
          <p className="widget-item_secondary">Controllers Down</p>
          */}
          <Link to="/snes">
            <p className="widget-items_primary">SNES Rankings</p>
          </Link>
          <p className="widget-items_primary">More Info</p>
        </div>
      </div>
    );
  }
}

export default connect()(MenuWidget);
