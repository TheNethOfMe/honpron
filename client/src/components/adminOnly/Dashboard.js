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
      <div>
        <h1>Hello, {this.state.name}</h1>
        <p className="lead">What would you like to do today?</p>
        <Link to="/admin">
          <BlockButton text="Create New Admin Account" />
        </Link>
        <Link to="/create-series">
          <BlockButton text="Create A New Series" />
        </Link>
        <BlockButton text="Create A New Entry" />
        <BlockButton text="Edit/Delete Entries" />
        <BlockButton text="Manage Users" />
        <BlockButton text="Check Messages" />
        <BlockButton text="Moderate Comments" />
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
