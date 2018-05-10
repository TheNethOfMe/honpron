import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AdminRoute = ({ component: Component, isAdmin, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAdmin === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

AdminRoute.propTypes = {
  isAdmin: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAdmin: state.auth.user.isAdmin || false
});

export default connect(mapStateToProps)(AdminRoute);
