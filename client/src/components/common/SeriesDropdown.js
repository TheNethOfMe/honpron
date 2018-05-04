import React from "react";
import PropTypes from "prop-types";

const SeriesDropdown = ({ series, name, onChange }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="seriesSelect">Series Select</label>
        <select
          multiple
          className="form-control"
          id="seriesSelect"
          name={name}
          onChange={onChange}
        >
          {series.map(item => {
            return (
              <option key={item._id} value={item.seriesName}>
                {item.seriesName}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

SeriesDropdown.propTypes = {
  series: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SeriesDropdown;
