import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
function GameStats({ genres, platform }) {
  return (
    <>
      <ListGroup>
        <h2>Genres</h2>
        {genres.map(item => {
          const { name, id } = item;
          return <ListGroup.Item key={id}>{name}</ListGroup.Item>;
        })}
      </ListGroup>
      <ListGroup>
        <h2>PlatForm</h2>
        {platform.map(item => {
          const { name, id } = item;
          return <ListGroup.Item key={id}>{name}</ListGroup.Item>;
        })}
      </ListGroup>
    </>
  );
}
export default GameStats;
