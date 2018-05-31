import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BlockButton from "../common/BlockButton";

class UserDash extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <h1>Welcome {user.userName}</h1>
        <Link to="/changeEmail">
          <BlockButton text={"Update Email Address"} />
        </Link>
        <Link
          to={{
            pathname: "/sendMessage",
            state: {
              recipient: "",
              subject: ""
            }
          }}
        >
          <BlockButton text={"Send A Message"} />
        </Link>
        <Link to="/getMessages">
          <BlockButton text={"Check Messages"} />
        </Link>
        <Link to="/myFavorites">
          <BlockButton text={"View Favorites"} />
        </Link>
        <BlockButton text={"Review Comments"} />
        <BlockButton text={"Delete Account"} />
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

export default connect(mapStateToProps)(UserDash);
