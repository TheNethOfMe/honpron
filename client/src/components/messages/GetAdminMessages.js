import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getTickets } from "../../actions/ticketActions";
import AdminMsgItem from "./AdminMsgItem";
import NoMessages from "../messages/NoMessages";

class GetAdminMessages extends Component {
  constructor() {
    super();
    this.state = {
      msgSelect: "tickets",
      openTickets: [],
      closedTickets: [],
      blacklistTickets: []
    };
    this.onSelect = this.onSelect.bind(this);
  }
  componentDidMount() {
    this.props.getTickets();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.tickets.tickets && nextProps.tickets.tickets !== null) {
      const tickets = nextProps.tickets.tickets;
      const openTickets = tickets.filter(
        ticket => ticket.colorCode !== "black" && !ticket.closed
      );
      const closedTickets = tickets.filter(ticket => ticket.closed);
      const blacklistTickets = tickets.filter(
        ticket => ticket.colorCode === "black" && !ticket.closed
      );
      this.setState({ openTickets, closedTickets, blacklistTickets });
    }
  }
  onSetClass(toMatch) {
    const thisClass =
      this.state.msgSelect === toMatch
        ? "nav-link hp-nav-active"
        : "nav-link hp-nav-inactive";
    return thisClass;
  }
  onSelect(e) {
    const msgSelect = e.target.innerHTML.toLowerCase();
    this.setState({ msgSelect });
  }
  render() {
    const { ticketLoading, tickets } = this.props.tickets;
    const {
      msgSelect,
      openTickets,
      closedTickets,
      blacklistTickets
    } = this.state;
    let display;
    if (tickets === null || ticketLoading) {
      display = <Spinner />;
    } else {
      if (msgSelect === "tickets") {
        display =
          openTickets.length === 0 ? (
            <NoMessages />
          ) : (
            openTickets.map(ticket => {
              return <AdminMsgItem key={ticket._id} msg={ticket} />;
            })
          );
      }
      if (msgSelect === "closed") {
        display =
          closedTickets.length === 0 ? (
            <NoMessages />
          ) : (
            closedTickets.map(ticket => {
              return <AdminMsgItem key={ticket._id} msg={ticket} />;
            })
          );
      }
      if (msgSelect === "blacklist") {
        display =
          blacklistTickets.length === 0 ? (
            <NoMessages />
          ) : (
            blacklistTickets.map(ticket => {
              return <AdminMsgItem key={ticket._id} msg={ticket} />;
            })
          );
      }
    }
    return (
      <div className="hp-card">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h1>Admin Messages</h1>
            <ul className="nav hp-nav justify-content-center nav-pills">
              <li className="nav-item">
                <p
                  onClick={this.onSelect}
                  className={this.onSetClass("tickets")}
                  name="regular"
                >
                  Tickets
                </p>
              </li>
              <li className="nav-item">
                <p
                  onClick={this.onSelect}
                  className={this.onSetClass("closed")}
                  name="closed"
                >
                  Closed
                </p>
              </li>
              <li className="nav-item">
                <p
                  onClick={this.onSelect}
                  className={this.onSetClass("blacklist")}
                  name="blacklist"
                >
                  Blacklist
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

const mapStateToProps = state => ({
  tickets: state.tickets
});

GetAdminMessages.propTypes = {
  getTickets: PropTypes.func.isRequired,
  tickets: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getTickets })(GetAdminMessages);
