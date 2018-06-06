import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { unblockUser } from "../../actions/authActions";

class BlockItem extends Component {
  constructor(props) {
    super(props);
    this.onUnblock = this.onUnblock.bind(this);
  }
  onUnblock() {
    this.props.unblockUser(
      { unblockUser: this.props.user },
      this.props.history
    );
  }
  render() {
    const user = this.props.user;
    const username = user.split("!")[1];
    return (
      <div className="hp-list_item">
        <div className="row">
          <div className="col-md-8 pt-1">{username}</div>
          <div className="col-md-4">
            <button onClick={this.onUnblock} className="btn btn-orange">
              Unblock
            </button>
          </div>
        </div>
      </div>
    );
  }
}

BlockItem.propTypes = {
  user: PropTypes.string.isRequired,
  unblockUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(null, { unblockUser })(BlockItem);
