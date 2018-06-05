import React from "react";
import PropTypes from "prop-types";

const TopicDropdown = ({ name, onChange }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="seriesSelect">Select Topic</label>
        <select
          className="form-control"
          id="selectTopic"
          name={name}
          onChange={onChange}
        >
          <option value="" />
          <option value="SNEScapades">SNEScapades game recommendation</option>
          <option value="Comment">Critisism/Compliment/Comment</option>
          <option value="Suggestion">General Suggestions</option>
          <option value="Bug Reporting">
            Report a Problem with a video or website
          </option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

TopicDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TopicDropdown;
