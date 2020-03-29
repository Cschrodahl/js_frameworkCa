import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import FavoriteGames from "./FavoriteGames";

function GameItem({ id, name, image, releasedDate, rating }) {
  let favorite = localStorage.getItem(name);
  //Adding or removing items in the localSorage
  const iconState = event => {
    if (event.target.classList.contains("active")) {
      localStorage.setItem(
        name,
        JSON.stringify({
          Name: name,
          Id: id,
          Image: image,
          ReleasedDate: releasedDate,
          Rating: rating
        })
      );
    } else {
      localStorage.removeItem(name);
    }
  };
  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <FavoriteGames
          favorite={favorite}
          iconState={iconState}
        ></FavoriteGames>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <b>Released: </b>
          {releasedDate}
        </ListGroupItem>
        <ListGroupItem>
          <b>rating: </b>
          {rating}
        </ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Link to={"game/" + id}>
          <Button variant="secondary" block>
            View
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

GameItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  releasedDate: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

export default GameItem;
