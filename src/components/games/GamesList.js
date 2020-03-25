import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GameItem from "./GameItem";
import { Games_URL } from "../../constants/api";
import SearchGame from "./SearchGame";

function GamesList() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(Games_URL)
      .then(response => response.json())
      .then(json => {
        setGames(json.results);
        setFilteredGames(json.results);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const filterCards = function(e) {
    // Let's get the value the user typed in and make it lower case:
    const searchValue = e.target.value.toLowerCase();

    // create a new array from the games array
    const filteredArray = games.filter(function(char) {
      // make each name lowercase so we can check it properly with the search value
      const lowerCaseName = char.name.toLowerCase();

      // check if the game name begins with the search value using the startsWith method
      if (lowerCaseName.startsWith(searchValue)) {
        // if it does, return true
        // this will add it to the new filtered array
        return true;
      }
      return false;
    });

    // set filtered games to the new array
    setFilteredGames(filteredArray);
  };
  if (loading) {
    return <Spinner animation="border" className="spinner" />;
  }

  return (
    <>
      <SearchGame handleSearch={filterCards} />
      <Row>
        {filteredGames.map(game => {
          const { id, name, background_image, released, rating } = game;

          return (
            <Col sm={6} md={3} key={id}>
              <GameItem
                id={id}
                name={name}
                image={background_image}
                releasedDate={released}
                rating={rating}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default GamesList;
