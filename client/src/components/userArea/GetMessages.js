import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../formFields/Spinner";
import { getAllMessages } from "../../actions/msgActions";
import MsgListItemRecieved from "./MsgListItemRecieved";
import MsgListItemSent from "./MsgListItemSent";

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
      const currentUser = this.props.auth.user.userName;
      const recievedMail = newMessages.filter(
        message => message.recipient === currentUser
      );
      const sentMail = newMessages.filter(
        message => message.author === currentUser
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
          return <MsgListItemRecieved msg={message} key={message._id} />;
        });
      }
      if (msgSelect === "sent") {
        display = sentMail.map(message => {
          return <MsgListItemSent msg={message} key={message._id} />;
        });
      }
    }
    return (
      <div className="messageList">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1>Messages</h1>
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <p
                    className={
                      msgSelect === "recieved" ? "nav-link active" : "nav-link"
                    }
                    onClick={this.onClickRecieved}
                  >
                    Recieved
                  </p>
                </li>
                <li className="nav-item">
                  <p
                    className={
                      msgSelect === "sent" ? "nav-link active" : "nav-link"
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
