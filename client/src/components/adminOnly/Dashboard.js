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
      <div className="admin-dashboard">
        <h1>Hello, {this.state.name}</h1>
        <p className="lead">What would you like to do today?</p>
        <Link to="/admin">
          <BlockButton text="Create New Admin Account" />
        </Link>
        <Link to="/create-series">
          <BlockButton text="Create A New Series" />
        </Link>
        <Link to="/create-entry">
          <BlockButton text="Create A New Entry" />
        </Link>
        <Link to="/all-entries">
          <BlockButton text="Edit/Delete Entries" />
        </Link>
        <Link to="/all-users">
          <BlockButton text="Manage Users" />
        </Link>
        <Link to="/moderate-comments">
          <BlockButton text="Moderate Comments" />
        </Link>
        <BlockButton text="Check Messages" />
        <BlockButton text="Manage Menus" />
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
