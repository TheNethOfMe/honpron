import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getTickets } from "../../actions/ticketActions";
import AdminMsgItem from "./AdminMsgItem";

class GetAdminMessages extends Component {
  constructor() {
    super();
    this.state = {
      msgSelect: "regular",
      tickets: []
    };
    this.onSelect = this.onSelect.bind(this);
  }
  componentDidMount() {
    this.props.getTickets();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.tickets.tickets && nextProps.tickets.tickets !== null) {
      const tickets = nextProps.tickets.tickets;
      this.setState({ tickets });
    }
  }
  onSetClass(toMatch) {
    const thisClass =
      this.state.msgSelect === toMatch ? "nav-link active" : "nav-link";
    return thisClass;
  }
  onSelect(e) {
    this.setState({ msgSelect: e.target.name });
  }
  render() {
    const { ticketLoading, tickets } = this.props.tickets;
    let display;
    if (tickets === null || ticketLoading) {
      display = <Spinner />;
    } else {
      let filteredTickets;
      if (this.state.msgSelect === "blacklist") {
        filteredTickets = tickets.filter(
          ticket => ticket.colorCode === "black"
        );
      }
      if (this.state.msgSelect === "closed") {
        filteredTickets = tickets.filter(ticket => ticket.closed);
      }
      if (this.state.msgSelect === "regular") {
        filteredTickets = tickets.filter(
          ticket => ticket.colorCode !== "black" && !ticket.closed
        );
      }
      display = filteredTickets.map(ticket => {
        return <AdminMsgItem key={ticket._id} msg={ticket} />;
      });
    }
    return (
      <div className="user-list">
        <h1>Admin Messages</h1>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <button
              onClick={this.onSelect}
              className={this.onSetClass("regular")}
              name="regular"
              href="#"
            >
              Tickets
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={this.onSelect}
              className={this.onSetClass("closed")}
              name="closed"
              href="#"
            >
              Closed
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={this.onSelect}
              className={this.onSetClass("blacklist")}
              name="blacklist"
              href="#"
            >
              Blacklist
            </button>
          </li>
        </ul>
        {display}
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
