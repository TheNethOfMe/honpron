import React from "react";
import PropTypes from "prop-types";

const ButtonBlock = ({ text }) => {
  return (
    <div className="row pt-2">
      <div className="col-md-8 m-auto">
        <button className="btn btn-admin btn-block">{text}</button>
      </div>
    </div>
  );
};

ButtonBlock.propTypes = {
  text: PropTypes.string.isRequired
};

export default ButtonBlock;
