import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const isAdmin = this.props.auth.user.isAdmin || false;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        {isAdmin && (
          <li className="nav-item">
            <Link className="nav-link hp-nav-item" to="/dashboard">
              [Admin {user.userName}]
            </Link>
          </li>
        )}
        {!isAdmin && (
          <li className="nav-item">
            <Link className="nav-link hp-nav-item" to="/user-dashboard">
              [{user.userName}]
            </Link>
          </li>
        )}
        <li className="nav-item">
          <a
            href="@"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link hp-nav-item"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link site-navbar_text" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link site-navbar_text" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm mb-4 site-navbar">
        <div className="container">
          <Link className="navbar-brand site-navbar_accent" to="/">
            Honest Piranha
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <i className="fas fa-bars site-navbar_burger" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps, { logoutUser })(Navbar));
