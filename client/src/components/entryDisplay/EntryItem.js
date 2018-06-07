import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import podcastIcon from "../../img/podcastIcon.png";

class EntryItem extends Component {
  render() {
    const entry = this.props.entry;
    const routerLink = `/view/${entry._id}`;
    const picLink =
      entry.entryType === "video"
        ? `http://img.youtube.com/vi/${entry.youtubeId}/maxresdefault.jpg`
        : podcastIcon;
    return (
      <div className="card entry-item">
        <Link to={routerLink}>
          <div className="card-body">
            <p className="text-muted text-left">{entry.series}</p>
            <img
              className="card-img-top"
              src={picLink}
              style={{ width: "90%" }}
              alt="Example"
            />
            <h5 className="card-title pt-2 entry-item_title">{entry.title}</h5>
            <p className="card-text entry-item_text">{entry.description}</p>
            <div className="display-entry_details d-flex justify-content-around">
              <span>
                <i className="far fa-comments" />
                <p>{entry.comments}</p>
              </span>
              {entry.entryType !== "blog" && (
                <span>
                  <i className="far fa-clock" />
                  <p>{entry.duration}</p>
                </span>
              )}
              <span>
                <i className="far fa-star" />
                <p>{entry.favorites.length}</p>
              </span>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

EntryItem.propTypes = {
  entry: PropTypes.object.isRequired
};

export default connect()(EntryItem);

// {" "}
//                   {entry.comments === 1 ? "Comment" : "Comments"}

// {" "}
//                   {entry.favorites.length === 1 ? "Like" : "Likes"}
