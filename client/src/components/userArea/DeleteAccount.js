import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changeDeletedUserComments } from "../../actions/commentActions";
import { getAllMessages, clearAllMessages } from "../../actions/msgActions";
import { deleteAccount } from "../../actions/authActions";
import Spinner from "../common/Spinner";

class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
  }
  componentDidMount() {
    this.props.getAllMessages();
  }
  deleteUser() {
    const myId = this.props.auth.user.id;
    this.props.changeDeletedUserComments();
    this.props.messages.messages.forEach(msg => {
      let updates;
      if (msg.authorId === myId) updates = { authorDelete: true };
      if (msg.recipientId === myId) updates = { recipientDelete: true };
      this.props.clearAllMessages(msg._id, updates);
    });
    this.props.deleteAccount(this.props.history);
  }
  render() {
    const { msgLoading, messages } = this.props.messages;
    return (
      <div className="hp-card">
        <h1>Delete Your Account</h1>
        {msgLoading || messages === null ? (
          <Spinner />
        ) : (
          <div>
            <p className="accent-text">
              This can't be undone once you click the button below. Keep in mind
              that the following things...
            </p>
            <div className="hp-card_delete-account">
              <p>This will not unsend messages you sent to other users.</p>
              <p>
                This will not delete any undeleted comments on videos, podcasts,
                etc. If you don't want your comments to remain, go and delete
                those first.
              </p>
              <p>
                Your username might not be made available again. If you want to
                come back, you may need to pick another one.
              </p>
              <p>We will super miss you.</p>
              <p className="hp-warning">
                Are you sure you want to delete your account?
              </p>
              <button
                onClick={this.deleteUser}
                className="btn btn-orange-block btn-block"
              >
                Delete My Account
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages,
  auth: state.auth
});

DeleteAccount.propTypes = {
  changeDeletedUserComments: PropTypes.func.isRequired,
  getAllMessages: PropTypes.func.isRequired,
  clearAllMessages: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  changeDeletedUserComments,
  getAllMessages,
  clearAllMessages,
  deleteAccount
})(DeleteAccount);
