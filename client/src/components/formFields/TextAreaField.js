import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  rows
}) => {
  return (
    <div className="form-group article-text">
      <textarea
        placeholder={placeholder}
        className={error ? "form-control is-invalid" : "form-control"}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.string.isRequired
};

export default TextAreaField;
