import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserComments } from "../../actions/commentActions";
import Spinner from "../common/Spinner";
import NoComment from "../entryDisplay/NoComment";
import EntryComment from "../entryDisplay/EntryComment";

class UserComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myComments: []
    };
  }
  componentDidMount() {
    this.props.getUserComments();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.comments.comments && nextProps.comments.comments !== null) {
      this.setState({ myComments: nextProps.comments.comments });
    }
  }
  render() {
    const { comments, comLoading } = this.props.comments;
    let display;
    if (comments === null || comLoading) {
      display = <Spinner />;
    } else if (comments.length === 0) {
      display = <NoComment />;
    } else {
      display = this.state.myComments.map(comment => {
        return <EntryComment key={comment._id} comment={comment} />;
      });
    }
    return <div>{display}</div>;
  }
}

UserComments.propTypes = {
  getUserComments: PropTypes.func.isRequired,
  comments: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  comments: state.comments
});

export default connect(mapStateToProps, { getUserComments })(UserComments);
