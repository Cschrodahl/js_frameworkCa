import React, { useState, useEffect } from "react";
import GameItem from "../games/GameItem";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SearchGame from "../games/SearchGame";

export function FavoritePage() {
  const favorites = { ...localStorage };
  const [game, setGames] = useState([]);
  let games = [];
  for (let key in favorites) {
    games.push(JSON.parse(favorites[key]));
  }
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setGames(games);
  }, []);
  const filterCards = function(e) {
    // Let's get the value the user typed in and make it lower case:
    const searchValue = e.target.value.toLowerCase();

    // create a new array from the games array
    const filteredArray = games.filter(function(char) {
      // make each name lowercase so we can check it properly with the search value
      const lowerCaseName = char.Name.toLowerCase();

      // check if the game name begins with the search value using the startsWith method
      if (lowerCaseName.startsWith(searchValue)) {
        // if it does, return true
        // this will add it to the new filtered array
        return true;
      }
      return false;
    });

    // set filtered games to the new array
    setGames(filteredArray);
  };
  return (
    <>
      <SearchGame handleSearch={filterCards} />
      <Row>
        {game.map(game => {
          const { Id, Name, Image, ReleasedDate, Rating } = game;

          return (
            <Col sm={6} md={3} key={Id}>
              <GameItem
                id={Id}
                name={Name}
                image={Image}
                releasedDate={ReleasedDate}
                rating={Rating}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default FavoritePage;
