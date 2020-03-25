import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import FavoriteGames from "./FavoriteGames";

//create hover effect based on if it already is a favorite or not
function iconEffect(event, state, image) {
  let value = [
    {
      mouseEvent: { mouseover: "mouseover", mouseout: "mouseout" }[event],
      state: state,
      image: {
        mouseover: !state ? "/icon/starIcon-03.png" : "/icon/starIcon-04.png",
        mouseout: !state ? "/icon/starIcon-01.png" : "/icon/starIcon-02.png"
      }[image]
    }
  ];
  return value;
}

function GameItem({ id, name, image, releasedDate, rating }) {
  let isFavorite = false;
  let ischecked = "";
  const favoriteImg = "/icon/starIcon-02.png";
  const favoriteImgN = "/icon/starIcon-01.png";

  if (localStorage.getItem(name)) {
    isFavorite = true;
    ischecked = favoriteImg;
  } else {
    ischecked = favoriteImgN;
  }

  const findFav = function(e) {
    if (!isFavorite && localStorage.getItem) {
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
      isFavorite = true;
      e.target.src = favoriteImg;
    } else {
      localStorage.removeItem(name);
      isFavorite = false;
      e.target.src = favoriteImgN;
    }
  };
  //I use the iconEffect function to change the favorite star based on state
  const iconState = event => {
    const e = iconEffect(
      event.nativeEvent.type,
      isFavorite,
      event.nativeEvent.type
    );
    for (let key in e) {
      event.target.src = e[key].image;
    }
  };
  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <FavoriteGames
          favorite={findFav}
          star={ischecked}
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
