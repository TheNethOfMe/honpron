import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class UserDash extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <h1>Welcome {user.username}</h1>
      </div>
    );
  }
}

UserDash.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(null)(UserDash);
