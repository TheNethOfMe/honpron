import React, { Component } from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import UserDash from "../userArea/UserDash";
import ChangeEmail from "../userArea/ChangeEmail";
import SendMessage from "../userArea/SendMessage";
import GetMessages from "../userArea/GetMessages";
import GetOneMessage from "../userArea/GetOneMessage";
import UserFavorites from "../userArea/UserFavorites";
import UserComments from "../userArea/UserComments";

export default class UserRouter extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/userDashboard" component={UserDash} />
        <PrivateRoute exact path="/changeEmail" component={ChangeEmail} />
        <PrivateRoute exact path="/sendMessage" component={SendMessage} />
        <PrivateRoute exact path="/getMessages" component={GetMessages} />
        <PrivateRoute exact path="/getMessage/:id" component={GetOneMessage} />
        <PrivateRoute exact path="/myFavorites" component={UserFavorites} />
        <PrivateRoute exact path="/myComments" component={UserComments} />
      </Switch>
    );
  }
}
