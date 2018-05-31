import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers, modifyUserStatus } from "../../actions/authActions";
import Spinner from "../formFields/Spinner";

class AdminUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      admin: []
    };
  }
  componentDidMount() {
    this.props.getUsers();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.userList && nextProps.user.userList.length > 0) {
      let usersList = [];
      let adminList = [];
      nextProps.user.userList.forEach(user => {
        if (user.isAdmin) {
          adminList.push(user);
        } else {
          usersList.push(user);
        }
      });
      this.setState({ users: usersList });
      this.setState({ admin: adminList });
    }
  }
  modifyUser(id, status) {
    this.props.modifyUserStatus(id, { status });
  }
  render() {
    const { userList, userLoading } = this.props.user;
    return (
      <div>
        {userList === null || userLoading ? (
          <Spinner />
        ) : (
          <div>
            <h2>Admin</h2>
            {this.state.admin.map(admin => {
              return (
                <div className="card text-center mt-2" key={admin._id}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-8">
                        <h5>{admin.userName}</h5>
                        <p>{admin.email}</p>
                      </div>
                      <div className="col-md-4">
                        <button className="btn btn-danger">Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <h2>Users</h2>
            {this.state.users.map(user => {
              return (
                <div className="card text-center mt-2" key={user._id}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-8">
                        <h5>{user.userName}</h5>
                        <p>{user.email}</p>
                        <p>Status: {user.status}</p>
                      </div>
                      <div className="col-md-4">
                        {user.status === "blacklisted" ? (
                          <button
                            onClick={() => this.modifyUser(user._id, "normal")}
                            className="btn btn-dark"
                          >
                            Unblacklist
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              this.modifyUser(user._id, "blacklisted")
                            }
                            className="btn btn-dark"
                          >
                            Blacklist
                          </button>
                        )}
                        {user.status === "banned" ? (
                          <button
                            onClick={() => this.modifyUser(user._id, "normal")}
                            className="btn btn-danger"
                          >
                            Unban
                          </button>
                        ) : (
                          <button
                            onClick={() => this.modifyUser(user._id, "banned")}
                            className="btn btn-danger"
                          >
                            Ban
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

AdminUserList.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  modifyUserStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth
});

export default connect(mapStateToProps, { getUsers, modifyUserStatus })(
  AdminUserList
);
