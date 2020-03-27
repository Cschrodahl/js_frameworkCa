import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
function GameStats({ info }) {
  return (
    <>
      <ListGroup>
        <ListGroup.Item>{info}</ListGroup.Item>
      </ListGroup>
    </>
  );
}
export default GameStats;
