import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getAllMessages } from "../../actions/msgActions";
import MsgListItem from "./MsgListItem";

class GetMessages extends Component {
  constructor() {
    super();
    this.state = {
      msgSelect: "recieved",
      recievedMail: [],
      sentMail: []
    };
    this.onClickRecieved = this.onClickRecieved.bind(this);
    this.onClickSent = this.onClickSent.bind(this);
  }
  componentDidMount() {
    this.props.getAllMessages();
  }
  onChangeSelect(select) {
    this.setState({ msgSelect: select });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.messages.messages && nextProps.messages.messages !== null) {
      const newMessages = nextProps.messages.messages;
      const currentUser = this.props.auth.user.id;
      const recievedMail = newMessages.filter(
        message => message.recipientId === currentUser
      );
      const sentMail = newMessages.filter(
        message => message.authorId === currentUser
      );
      this.setState({ recievedMail, sentMail });
    }
  }
  onClickRecieved() {
    this.setState({ msgSelect: "recieved" });
  }
  onClickSent() {
    this.setState({ msgSelect: "sent" });
  }
  render() {
    const { messages, msgLoading } = this.props.messages;
    const { msgSelect, recievedMail, sentMail } = this.state;
    let display;
    if (messages === null || msgLoading) {
      display = <Spinner />;
    } else {
      if (msgSelect === "recieved") {
        display = recievedMail.map(message => {
          return (
            <MsgListItem msg={message} key={message._id} useris="recipient" />
          );
        });
      }
      if (msgSelect === "sent") {
        display = sentMail.map(message => {
          return (
            <MsgListItem msg={message} key={message._id} useris="author" />
          );
        });
      }
    }
    return (
      <div className="hp-card">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h1>Messages</h1>
            <ul className="nav hp-nav justify-content-center nav-pills">
              <li className="nav-item">
                <p
                  className={
                    msgSelect === "recieved"
                      ? "nav-link hp-nav-active"
                      : "nav-link hp-nav-inactive"
                  }
                  onClick={this.onClickRecieved}
                >
                  Recieved
                </p>
              </li>
              <li className="nav-item">
                <p
                  className={
                    msgSelect === "sent"
                      ? "nav-link hp-nav-active"
                      : "nav-link hp-nav-inactive"
                  }
                  onClick={this.onClickSent}
                >
                  Sent
                </p>
              </li>
            </ul>
            {display}
          </div>
        </div>
      </div>
    );
  }
}

GetMessages.propTypes = {
  getAllMessages: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages,
  auth: state.auth
});

export default connect(mapStateToProps, { getAllMessages })(GetMessages);
