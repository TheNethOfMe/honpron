import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import VideoDisplay from "./VideoDisplay";
import { getOneEntry } from "../../actions/entryActions";
import { getEntryComments } from "../../actions/commentActions";
import Spinner from "../common/Spinner";
import NoComment from "./NoComment";
import NoWidget from "./NoWidget";
import CommentWidget from "./CommentWidget";
import EntryComment from "./EntryComment";
import podcasticon from "../../img/podcastIcon.png";

class DisplayEntry extends Component {
  componentWillMount() {
    this.props.getOneEntry(this.props.match.params.id);
    this.props.getEntryComments(this.props.match.params.id);
  }
  render() {
    const { singleEntry, loading } = this.props.entry;
    const { comments, comLoading } = this.props.comments;
    const { isAuthenticated } = this.props.auth;
    let display, commentDisplay, entry, isFav, displayHeader, commentWidget;
    if (singleEntry === null || loading) {
      display = <Spinner />;
    } else {
      entry = this.props.entry.singleEntry;
      isFav = entry.favorites.includes(this.props.auth.user.id);
      commentWidget = isAuthenticated ? (
        <CommentWidget
          entryId={entry._id}
          entryTitle={entry.title}
          isFav={isFav}
        />
      ) : (
        <NoWidget />
      );
      displayHeader =
        entry.entryType === "video" ? (
          <VideoDisplay ytid={entry.youtubeId} title={entry.title} />
        ) : (
          <img
            className="card-img-top display-entry_img"
            src={podcasticon}
            style={{ width: "90%" }}
            alt="Podcast Icon"
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
                  {entry.comments}{" "}
                  {entry.comments === 1 ? "Comment" : "Comments"}
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
      if (comments === null || comLoading) {
        commentDisplay = <Spinner />;
      } else if (comments.length === 0) {
        commentDisplay = <NoComment />;
      } else {
        commentDisplay = comments.map(comment => {
          return <EntryComment key={comment._id} comment={comment} />;
        });
      }
    }
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            {display}
            {commentWidget}
            {commentDisplay}
          </div>
        </div>
      </div>
    );
  }
}

DisplayEntry.propTypes = {
  entry: PropTypes.object.isRequired,
  getOneEntry: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getEntryComments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  entry: state.entry,
  auth: state.auth,
  comments: state.comments
});

export default connect(mapStateToProps, { getOneEntry, getEntryComments })(
  DisplayEntry
);
