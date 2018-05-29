import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUnmoddedComments } from "../../actions/commentActions";
import Spinner from "../formFields/Spinner";
import ModCommentItem from "./ModCommentItem";

class ModerateComments extends Component {
  componentDidMount() {
    this.props.getUnmoddedComments();
  }
  render() {
    const { comments, comLoading } = this.props.comments;
    let display;
    if (comments === null || comLoading) {
      display = <Spinner />;
    } else if (comments.length === 0) {
      display = <p>No comments to display</p>;
    } else {
      display = comments.map(comment => {
        return (
          <ModCommentItem
            key={comment._id}
            comment={comment}
            history={this.props.history}
          />
        );
      });
    }
    return (
      <div className="moderate-comments">
        <h1>Moderate Comments</h1>
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
