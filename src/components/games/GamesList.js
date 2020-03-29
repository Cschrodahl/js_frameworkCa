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
  // Filtering the games based on search result
  const filterCards = function(e) {
    const searchValue = e.target.value.toLowerCase();

    const filteredArray = games.filter(function(char) {
      const lowerCaseName = char.name.toLowerCase();

      if (lowerCaseName.startsWith(searchValue)) {
        return true;
      }
      return false;
    });
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
