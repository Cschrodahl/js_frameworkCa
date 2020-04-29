import React from "react";
import PropTypes from "prop-types";

function FormSubmitted({ displayMessage }) {
  if (displayMessage) {
    return <h4 className="sent">Your message was sent.</h4>;
  }

  return null;
}

FormSubmitted.propTypes = {
  displayMessage: PropTypes.bool.isRequired,
};

export default FormSubmitted;
