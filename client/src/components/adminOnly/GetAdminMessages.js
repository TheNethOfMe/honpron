import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../formFields/Spinner";
import { getAdminMessages } from "../../actions/msgActions";
import MsgListItem from "../userArea/MsgListItem";

class GetAdminMessages extends Component {
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
    this.props.getAdminMessages();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.messages.messages && nextProps.messages.messages !== null) {
      const newMessages = nextProps.messages.messages;
      const recievedMail = newMessages.filter(
        message => message.recipientId === "Admin"
      );
      const sentMail = newMessages.filter(
        message => message.authorId === "Admin"
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
  onChangeSelect(select) {
    this.setState({ msgSelect: select });
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
      <div className="user-list">
        <h1>Admin Messages</h1>
        {this.state.msgSelect === "recieved" && (
          <button onClick={this.onSelectBlacklist} className="btn btn-snes">
            View Mail Admin Sent
          </button>
        )}
        {this.state.comSelect === "sent" && (
          <button onClick={this.onSelectRegular} className="btn btn-snes">
            Check Admin Mail
          </button>
        )}
        {display}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages
});

GetAdminMessages.propTypes = {
  getAdminMessages: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getAdminMessages })(GetAdminMessages);
