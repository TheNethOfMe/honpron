import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BlockButton from "../common/BlockButton";

class UserDash extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="dashboard">
        <h1>Welcome {user.userName}</h1>

        <h3 className="mt-2">Messages</h3>
        <Link to="/get-messages">
          <BlockButton text={"Check Messages"} />
        </Link>
        <Link to="/contact-us">
          <BlockButton text={"Contact Us"} />
        </Link>
        <Link
          to={{
            pathname: "/send-message",
            state: {
              recipient: "",
              subject: ""
            }
          }}
        >
          <BlockButton text={"Message Another User"} />
        </Link>

        <h3 className="mt-2">Entries</h3>
        <Link to="/my-favorites">
          <BlockButton text={"Entries You've Liked"} />
        </Link>
        <Link to="/my-comments">
          <BlockButton text={"Review Your Comments"} />
        </Link>

        <h3 className="mt-2">Your Account</h3>
        <Link to="/my-block-list">
          <BlockButton text={"Users You've Blocked"} />
        </Link>
        <Link to="/change-email">
          <BlockButton text={"Update Email Address"} />
        </Link>
        <Link to="/delete-account">
          <BlockButton text={"Delete Account"} />
        </Link>
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
