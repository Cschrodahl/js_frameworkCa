import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import FavoriteGames from "./FavoriteGames";

//create hover effect based on if it already is a favorite or not
function iconEffect(event, state, image, name) {
  let value = [
    {
      mouseEvent: {
        mouseover: "mouseover",
        mouseout: "mouseout",
        click: "click"
      }[event],
      state: state,
      clicked: {
        click:
          !state && localStorage.getItem(name)
            ? (state = true)
            : (state = false)
      }[event],
      image: {
        mouseover: !state ? "/icon/starIcon-03.png" : "/icon/starIcon-04.png",
        mouseout: !state ? "/icon/starIcon-01.png" : "/icon/starIcon-02.png",
        click: !state ? "/icon/starIcon-02.png" : "/icon/starIcon-01.png"
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

  //I use the iconEffect function to change the favorite star based on state
  const iconState = event => {
    const e = iconEffect(
      event.nativeEvent.type,
      isFavorite,
      event.nativeEvent.type,
      name
    );
    for (let key in e) {
      event.target.src = e[key].image;
      if (event.nativeEvent.type === "click") {
        isFavorite = e[key].clicked;
        if (!isFavorite) {
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
      }
    }
  };
  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <FavoriteGames star={ischecked} iconState={iconState}></FavoriteGames>
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
