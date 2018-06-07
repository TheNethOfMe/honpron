import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import EntryList from "./components/entryDisplay/EntryList";
import EntryListSeries from "./components/entryDisplay/EntryListSeries";
import DisplaySeries from "./components/entryDisplay/DisplaySeries";
import Snes from "./components/other/Snes";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Footer from "./components/layout/Footer";

import AdminRouter from "./components/routers/AdminRouter";
import UserRouter from "./components/routers/UserRouter";

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
            <div className="wrapper">
              <div className="nav-wrapper">
                <Navbar />
              </div>

              <div className="site-wrapper">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <Route exact path="/" component={EntryList} />
                      <Route
                        exact
                        path="/series/:series"
                        component={EntryListSeries}
                      />
                      <Route
                        exact
                        path="/type/:type"
                        component={DisplaySeries}
                      />
                      <Route exact path="/view/:id" component={DisplayEntry} />
                      <Route exact path="/snes" component={Snes} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/login" component={Login} />
                      <AdminRouter />
                      <UserRouter />
                    </div>
                  </div>
                </div>
              </div>

              <div className="foot-wrapper">
                <Footer />
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
