import React from "react";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export default function SearchGame({ handleSearch }) {
  //Search bar
  return (
    <InputGroup className="search">
      <FormControl
        placeholder="Search by name..."
        onChange={event => handleSearch(event)}
      />
    </InputGroup>
  );
}

SearchGame.propTypes = {
  handleSearch: PropTypes.func.isRequired
};
