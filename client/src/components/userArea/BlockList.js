import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BlockItem from "./BlockItem";
import { getBlockList } from "../../actions/authActions";
import Spinner from "../common/Spinner";

class BlockList extends Component {
  componentDidMount() {
    this.props.getBlockList();
  }
  render() {
    const { blockList, userLoading } = this.props.auth;
    let display;
    if (userLoading || blockList === null) {
      display = <Spinner />;
    } else if (blockList.length === 0) {
      display = <p>You haven't blocked any users</p>;
    } else {
      display = blockList.map((block, i) => {
        return <BlockItem key={i} user={block} history={this.props.history} />;
      });
    }
    return (
      <div className="hp-card">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h1>Block List</h1>
            <p>These users cannot send you messages unless you unblock them</p>
            {display}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

BlockList.propTypes = {
  auth: PropTypes.object.isRequired,
  getBlockList: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getBlockList })(BlockList);
