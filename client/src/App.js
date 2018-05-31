import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Footer from "./components/layout/Footer";

import AdminRoute from "./components/routers/AdminRoute";
import PrivateRoute from "./components/routers/PrivateRoute";

import Admin from "./components/auth/Admin";
import Dashboard from "./components/adminOnly/Dashboard";
import CreateSeries from "./components/adminOnly/CreateSeries";
import CreateEntry from "./components/adminOnly/CreateEntry";
import AdminEntryList from "./components/adminOnly/AdminEntryList";
import AdminUserList from "./components/adminOnly/AdminUserList";
import ModerateComments from "./components/adminOnly/ModerateComments";

import UserDash from "./components/userArea/UserDash";
import ChangeEmail from "./components/userArea/ChangeEmail";
import SendMessage from "./components/userArea/SendMessage";
import GetMessages from "./components/userArea/GetMessages";
import GetOneMessage from "./components/userArea/GetOneMessage";
import UserFavorites from "./components/userArea/UserFavorites";
import UserComments from "./components/userArea/UserComments";

import DisplayEntry from "./components/entryDisplay/DisplayEntry";

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
                {
                  // ADMIN ROUTES
                }
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
                <AdminRoute
                  exact
                  path="/all-entries"
                  component={AdminEntryList}
                />
                <AdminRoute
                  exact
                  path="/update-entry/:id"
                  component={CreateEntry}
                />
                <AdminRoute exact path="/all-users" component={AdminUserList} />
                {
                  // USER ROUTES
                }
                <PrivateRoute
                  exact
                  path="/userDashboard"
                  component={UserDash}
                />
                <PrivateRoute
                  exact
                  path="/changeEmail"
                  component={ChangeEmail}
                />
                <PrivateRoute
                  exact
                  path="/sendMessage"
                  component={SendMessage}
                />
                <PrivateRoute
                  exact
                  path="/getMessages"
                  component={GetMessages}
                />
                <PrivateRoute
                  exact
                  path="/getMessage/:id"
                  component={GetOneMessage}
                />
                <PrivateRoute
                  exact
                  path="/moderateComments"
                  component={ModerateComments}
                />
                <PrivateRoute
                  exact
                  path="/myFavorites"
                  component={UserFavorites}
                />
                <PrivateRoute
                  exact
                  path="/myComments"
                  component={UserComments}
                />
              </Switch>
              <Route exact path="/view/:id" component={DisplayEntry} />
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
