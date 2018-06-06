import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BlockButton from "../common/BlockButton";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.userName
    };
  }
  render() {
    return (
      <div className="dashboard">
        <h1>Hello, {this.state.name}</h1>

        <h3 className="mt-2">Messages</h3>
        <Link to="/get-admin-messages">
          <BlockButton text="Check Honest Piranha Messages" />
        </Link>
        <Link to="/get-messages">
          <BlockButton text="Check Personal Messages" />
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

        <h3 className="mt-2">Series/Entries</h3>
        <Link to="/create-series">
          <BlockButton text="Create A New Series" />
        </Link>
        <Link to="/create-entry">
          <BlockButton text="Create A New Entry" />
        </Link>
        <Link to="/all-entries">
          <BlockButton text="Edit/Delete Entries" />
        </Link>
        <Link to="/my-favorites">
          <BlockButton text={"Entries You've Liked"} />
        </Link>
        <Link to="/my-comments">
          <BlockButton text={"Review Your Comments"} />
        </Link>

        <h3 className="mt-2">Admin/Users</h3>
        <Link to="/admin">
          <BlockButton text="Create New Admin Account" />
        </Link>
        <Link to="/all-users">
          <BlockButton text="Manage Users" />
        </Link>
        <Link to="/my-block-list">
          <BlockButton text={"Users You've Blocked"} />
        </Link>
        <Link to="/change-email">
          <BlockButton text={"Update Email Address"} />
        </Link>

        <h3 className="mt-2">Moderate Comments</h3>
        <Link to="/moderate-comments">
          <BlockButton text="Moderate Comments" />
        </Link>
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);
