import React from "react";
import PropTypes from "prop-types";

const SelectType = ({ name, type, onChange }) => {
  return (
    <div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name={name}
          id="inlineRadio1"
          value="podcast"
          checked={type === "podcast"}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor="inlineRadio1">
          Podcast
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name={name}
          id="inlineRadio2"
          value="video"
          checked={type === "video"}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor="inlineRadio2">
          Video
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name={name}
          id="inlineRadio3"
          value="blog"
          checked={type === "blog"}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor="inlineRadio3">
          Blog
        </label>
      </div>
    </div>
  );
};

SelectType.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SelectType;
