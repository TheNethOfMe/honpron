import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../formFields/Spinner";
import { readMessage, updateMessage } from "../../actions/msgActions";

class ViewSentMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id
    };
    this.onDelete = this.onDelete.bind(this);
  }
  componentDidMount() {
    this.props.readMessage(this.state.id);
  }
  onDelete() {
    const updates = { authorDelete: true };
    this.props.updateMessage(this.state.id, updates);
    this.props.history.push("/getMessages");
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
            <h3>
              Sent To: {singleMsg.recipient}{" "}
              <small>On {new Date(singleMsg.date).toLocaleDateString()}</small>
            </h3>
            <button className="btn btn-light">Add Friend</button>
            <button className="btn btn-dark">Block Sender</button>
            <div>{singleMsg.body}</div>
            <div>
              <Link
                to={{
                  pathname: "/sendMessage",
                  state: {
                    recipient: singleMsg.recipient,
                    subject: `Re: ${singleMsg.subject}`
                  }
                }}
              >
                <button className="btn btn-success">
                  Send Another Message
                </button>
              </Link>
              <Link to="/getMessages">
                <button className="btn btn-primary">Return to Inbox</button>
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                data-toggle="modal"
                data-target="#verifyDelete"
              >
                Delete Message
              </button>

              <div
                className="modal fade"
                id="verifyDelete"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Are you sure?
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      Do you want to delete this message from your inbox? This
                      cannot be undone. <br />
                      <small>
                        Deleting messages you wrote does not unsend them.
                      </small>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-info"
                        data-dismiss="modal"
                      >
                        No, Keep This
                      </button>
                      <button
                        onClick={this.onDelete}
                        type="button"
                        className="btn btn-danger"
                        data-dismiss="modal"
                      >
                        Yes, Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ViewSentMessage.propTypes = {
  readMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(mapStateToProps, { readMessage, updateMessage })(
  ViewSentMessage
);
