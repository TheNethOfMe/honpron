import React, { Component } from "react";
import { Switch } from "react-router-dom";
import AdminRoute from "./AdminRoute";

import Admin from "../auth/Admin";
import Dashboard from "../adminOnly/Dashboard";
import CreateSeries from "../adminOnly/CreateSeries";
import CreateEntry from "../adminOnly/CreateEntry";
import AdminEntryList from "../adminOnly/AdminEntryList";
import AdminUserList from "../adminOnly/AdminUserList";
import ModerateComments from "../adminOnly/ModerateComments";
import GetAdminMessages from "../messages/GetAdminMessages";
import GetOneTicket from "../messages/GetOneTicket";

export default class AdminRouter extends Component {
  render() {
    return (
      <Switch>
        <AdminRoute exact path="/admin" component={Admin} />
        <AdminRoute exact path="/dashboard" component={Dashboard} />
        <AdminRoute exact path="/create-series" component={CreateSeries} />
        <AdminRoute exact path="/create-entry" component={CreateEntry} />
        <AdminRoute exact path="/all-entries" component={AdminEntryList} />
        <AdminRoute exact path="/update-entry/:id" component={CreateEntry} />
        <AdminRoute exact path="/all-users" component={AdminUserList} />
        <AdminRoute
          exact
          path="/moderate-comments"
          component={ModerateComments}
        />
        <AdminRoute
          exact
          path="/get-admin-messages"
          component={GetAdminMessages}
        />
        <AdminRoute exact path="/get-one-ticket/:id" component={GetOneTicket} />
      </Switch>
    );
  }
}
