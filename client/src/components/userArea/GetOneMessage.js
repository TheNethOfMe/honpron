import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../formFields/Spinner";
import { readMessage } from "../../actions/msgActions";

class GetOneMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id
    };
  }
  componentDidMount() {
    this.props.readMessage(this.state.id);
  }
  render() {
    const { singleMsg, msgLoading } = this.props.messages;
    return (
      <div>
        {singleMsg === null || msgLoading ? (
          <Spinner />
        ) : (
          <div>
            <h1>{singleMsg.subject}</h1>
            <h3>From: {singleMsg.author}</h3>
            <button className="btn btn-light">Add Friend</button>
            <button className="btn btn-dark">Block Sender</button>
            <div>{singleMsg.body}</div>
            <button className="btn btn-success">Reply</button>
            <button className="btn btn-primary">Return to Inbox</button>
            <button className="btn btn-danger">Delete Message</button>
          </div>
        )}
      </div>
    );
  }
}

GetOneMessage.propTypes = {
  readMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(mapStateToProps, { readMessage })(GetOneMessage);
