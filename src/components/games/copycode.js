import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import FavoriteGames from "./FavoriteGames";
var request = indexedDB.open("MyTestDatabase", 1),
  db,
  store,
  tx;

request.onupgradeneeded = function() {
  let db = request.result;
  store = db.createObjectStore("FavoriteGames", { keyPath: "ID" });
  //index = store.createIndex("GameName", "GameName", { unique: false });
};
function SaveFavorites(result, task) {
  request = indexedDB.open("MyTestDatabase", 1);
  console.log(result);
  request.onerror = function(event) {
    // Do something with request.errorCode!
    console.log("There was an error", event.target.errorCode);
  };
  request.onsuccess = function(event) {
    // Do something with request.result!
    db = request.result;
    tx = db.transaction("FavoriteGames", "readwrite");
    store = tx.objectStore("FavoriteGames");
    //index = store.index("GameName");

    db.onerror = function(event) {
      console.log("ERROR", event.target.errorCode);
    };
    result.forEach(function(obj) {
      store[task](obj);
    });
    //  let game = store.get(0);

    // game.onsuccess = function() {
    // console.log(game.result);
    //};
    tx.oncomplete = function() {
      db.close();
    };
  };
}
let favoriteArray = [];
function GameItem({ id, name, image, releasedDate, rating }) {
  let isFavorite = false;
  let ischecked = "";
  const favoriteImg = "/logo192.png";
  const favoriteImgN = "/logo512.png";
  if (localStorage.getItem(name)) {
    isFavorite = true;
    ischecked = favoriteImg;
  } else {
    ischecked = favoriteImgN;
  }

  let i = -1;
  const findFav = function(e) {
    if (!isFavorite && localStorage.getItem) {
      localStorage.setItem(name, JSON.stringify({ Name: name }));
      // favoriteArray.push({ ID: id, GameName: name });
      isFavorite = true;
      e.target.src = favoriteImg;
    } else {
      localStorage.removeItem(name);
      isFavorite = false;
      e.target.src = favoriteImgN;
    }
    SaveFavorites(favoriteArray, "put");
  };

  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
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
        <FavoriteGames favorite={findFav} star={ischecked}>
          Favorite
        </FavoriteGames>
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
