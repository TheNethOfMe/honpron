import React, { Component } from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import UserDash from "../userArea/UserDash";
import ChangeEmail from "../userArea/ChangeEmail";
import SendMessage from "../messages/SendMessage";
import SendMsgAdmin from "../messages/SendMsgAdmin";
import GetMessages from "../messages/GetMessages";
import GetOneMessage from "../messages/GetOneMessage";
import UserFavorites from "../userArea/UserFavorites";
import UserComments from "../userArea/UserComments";
import BlockList from "../userArea/BlockList";
import DeleteAccount from "../userArea/DeleteAccount";

export default class UserRouter extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/user-dashboard" component={UserDash} />
        <PrivateRoute exact path="/change-email" component={ChangeEmail} />
        <PrivateRoute exact path="/send-message" component={SendMessage} />
        <PrivateRoute exact path="/contact-us" component={SendMsgAdmin} />
        <PrivateRoute exact path="/get-messages" component={GetMessages} />
        <PrivateRoute exact path="/get-message/:id" component={GetOneMessage} />
        <PrivateRoute exact path="/my-favorites" component={UserFavorites} />
        <PrivateRoute exact path="/my-comments" component={UserComments} />
        <PrivateRoute exact path="/my-block-list" component={BlockList} />
        <PrivateRoute exact path="/delete-account" component={DeleteAccount} />
      </Switch>
    );
  }
}
