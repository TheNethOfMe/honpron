import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserComments } from "../../actions/commentActions";
import Spinner from "../common/Spinner";
import NoComment from "../entryDisplay/NoComment";
import UserComment from "./UserComment";

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
        return <UserComment key={comment._id} comment={comment} />;
      });
    }
    return (
      <div className="hp-card">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h1>My Comments</h1>
            <p>Only approved comments will appear here.</p>
            <div className="hp-nav" />
            {display}
          </div>
        </div>
      </div>
    );
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
