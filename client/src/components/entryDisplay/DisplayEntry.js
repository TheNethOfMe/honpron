import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import YoutubeEmbedVideo from "youtube-embed-video";
import { getOneEntry } from "../../actions/entryActions";
import Spinner from "../formFields/Spinner";
import NoComment from "./NoComment";
import CommentWidget from "./CommentWidget";

class DisplayEntry extends Component {
  componentWillMount() {
    this.props.getOneEntry(this.props.match.params.id);
  }
  render() {
    const { singleEntry, loading } = this.props.entry;
    const { isAuthenticated } = this.props.auth;
    const commentWidget = !isAuthenticated ? (
      <div className="card mt-2 display-entry">
        <div className="card-body">
          <p className="card-title display-entry_title">
            You must be logged in to leave a comment.
          </p>
        </div>
      </div>
    ) : (
      <CommentWidget />
    );
    let display, comments, entry, displayHeader;
    if (singleEntry === null || loading) {
      display = <Spinner />;
      comments = <NoComment />;
    } else {
      entry = this.props.entry.singleEntry;
      displayHeader =
        entry.entryType === "video" ? (
          <YoutubeEmbedVideo videoId={entry.youtubeId} size="large" />
        ) : (
          <img
            className="card-img-top display-entry_img"
            src={"https://picsum.photos/200/?random"}
            style={{ width: "90%" }}
            alt="Example"
          />
        );
      display = (
        <div className="card display-entry">
          <div className="card-body">
            <p className="text-muted text-left">{entry.series}</p>
            {displayHeader}
            <h5 className="card-title pt-2 display-entry_title">
              {entry.title}
            </h5>
            <p className="card-text display-entry_text">{entry.description}</p>
            <div className="display-entry_details d-flex justify-content-around">
              {entry.entryType !== "blog" && (
                <span>
                  <i className="far fa-clock" />
                  <p>{entry.duration}</p>
                </span>
              )}
              <span>
                <i className="far fa-comments" />
                <p>
                  {entry.comments.length}{" "}
                  {entry.comments.length === 1 ? "Comment" : "Comments"}
                </p>
              </span>
              <span>
                <i className="far fa-star" />
                <p>
                  {entry.favorites.length}{" "}
                  {entry.favorites.length === 1 ? "Like" : "Likes"}
                </p>
              </span>
            </div>
          </div>
        </div>
      );
      if (entry.comments.length > 0) {
        comments = entry.comments.map(comment => {
          return <p>Comment</p>;
        });
      } else {
        comments = <NoComment />;
      }
    }
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            {display}
            {commentWidget}
            {comments}
          </div>
        </div>
      </div>
    );
  }
}

DisplayEntry.propTypes = {
  entry: PropTypes.object.isRequired,
  getOneEntry: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  entry: state.entry,
  auth: state.auth
});

export default connect(mapStateToProps, { getOneEntry })(DisplayEntry);
