import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AdminEntryItem = ({ entry }) => {
  return (
    <div className="admin-entry-item card text-center mt-2">
      <div className="card-body">
        <div className="row">
          <div className="col-md-8">
            <h5>
              {entry.title}
              <small> {entry.entryType}</small>
            </h5>
            <p>{entry.description}</p>
          </div>
          <div className="col-md-4">
            <Link
              to={{
                pathname: `/update-entry/${entry._id}`,
                search: entry.entryType
              }}
              className="btn btn-info mr-4"
            >
              Edit
            </Link>
            <button className="btn btn-danger mr-4">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

AdminEntryItem.propTypes = {
  entry: PropTypes.object.isRequired
};

export default AdminEntryItem;
