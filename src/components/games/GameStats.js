import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
function GameStats({ genres, platform }) {
  //Create a list to display the genres and platforms to the game
  return (
    <div className="InfoLists">
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
    </div>
  );
}
export default GameStats;
