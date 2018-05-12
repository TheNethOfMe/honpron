import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../formFields/Spinner";
import { getAllMessages } from "../../actions/msgActions";
import MsgListItem from "./MsgListItem";

class GetMessages extends Component {
  componentDidMount() {
    this.props.getAllMessages();
  }
  render() {
    const { messages, msgLoading } = this.props.messages;
    let display;
    if (messages === null || msgLoading) {
      display = <Spinner />;
    } else if (messages.length === 0) {
      display = <p>There are no messages to display</p>;
    } else {
      display = messages.map(message => {
        return <MsgListItem msg={message} />;
      });
    }
    return (
      <div className="messageList">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1>Messages</h1>
              {display}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GetMessages.propTypes = {
  getAllMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(mapStateToProps, { getAllMessages })(GetMessages);
