import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";
import AdminRoute from "./components/common/AdminRoute";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Admin from "./components/auth/Admin";
import Login from "./components/auth/Login";
import Footer from "./components/layout/Footer";

import Dashboard from "./components/adminOnly/Dashboard";
import CreateSeries from "./components/adminOnly/CreateSeries";
import CreateEntry from "./components/adminOnly/CreateEntry";

import "./App.css";

if (localStorage.jwtToken) {
  // check for token in local storage
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Switch>
                <AdminRoute exact path="/admin" component={Admin} />
                <AdminRoute exact path="/dashboard" component={Dashboard} />
                <AdminRoute
                  exact
                  path="/create-series"
                  component={CreateSeries}
                />
                <AdminRoute
                  exact
                  path="/create-entry"
                  component={CreateEntry}
                />
              </Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
