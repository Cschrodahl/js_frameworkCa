import React, { useState, useEffect } from "react";
import GameItem from "../games/GameItem";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SearchGame from "../games/SearchGame";

export function FavoritePage() {
  const [game, setGames] = useState([]);
  const [games, getGames] = useState([]);
  useEffect(() => {
    getGames(function(value) {
      const favorites = { ...localStorage };
      for (let key in favorites) {
        value.push(JSON.parse(favorites[key]));
      }
      return value;
    });
    setGames(games);
  }, [games]);

  //Filtering the card based on search field
  const filterCards = function(e) {
    const searchValue = e.target.value.toLowerCase();
    const filteredArray = games.filter(function(char) {
      const lowerCaseName = char.Name.toLowerCase();
      if (lowerCaseName.startsWith(searchValue)) {
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
