import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUnmoddedComments } from "../../actions/commentActions";
import Spinner from "../common/Spinner";
import ModCommentItem from "./ModCommentItem";

class ModerateComments extends Component {
  constructor() {
    super();
    this.state = {
      comSelect: "regular",
      regularComs: [],
      blacklistComs: []
    };
    this.onSelectBlacklist = this.onSelectBlacklist.bind(this);
    this.onSelectRegular = this.onSelectRegular.bind(this);
  }
  componentDidMount() {
    this.props.getUnmoddedComments();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.comments.comments && nextProps.comments.comments !== null) {
      const newComments = nextProps.comments.comments;
      const regularComs = newComments.filter(
        comment => comment.commentCode !== "black"
      );
      const blacklistComs = newComments.filter(
        comment => comment.commentCode === "black"
      );
      this.setState({ regularComs, blacklistComs });
    }
  }
  onSelectBlacklist() {
    this.setState({ comSelect: "blacklist" });
  }
  onSelectRegular() {
    this.setState({ comSelect: "regular" });
  }
  render() {
    const { comments, comLoading } = this.props.comments;
    const { comSelect, regularComs, blacklistComs } = this.state;
    let display;
    if (comments === null || comLoading) {
      display = <Spinner />;
    } else {
      if (comSelect === "regular") {
        display = regularComs.map(comment => {
          return (
            <ModCommentItem
              key={comment._id}
              comment={comment}
              history={this.props.history}
            />
          );
        });
      }
      if (comSelect === "blacklist") {
        display = blacklistComs.map(comment => {
          return (
            <ModCommentItem
              key={comment._id}
              comment={comment}
              history={this.props.history}
            />
          );
        });
      }
    }
    return (
      <div className="hp-card">
        <h1>Moderate Comments</h1>
        {this.state.comSelect === "regular" && (
          <button onClick={this.onSelectBlacklist} className="btn btn-snes">
            Check Blacklist
          </button>
        )}
        {this.state.comSelect === "blacklist" && (
          <button onClick={this.onSelectRegular} className="btn btn-snes">
            Leave Blacklist
          </button>
        )}
        {display}
      </div>
    );
  }
}

ModerateComments.propTypes = {
  getUnmoddedComments: PropTypes.func.isRequired,
  comments: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  comments: state.comments
});

export default connect(mapStateToProps, { getUnmoddedComments })(
  ModerateComments
);
