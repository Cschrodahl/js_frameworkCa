import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import FavoriteGames from "./FavoriteGames";
var request = indexedDB.open("FavoriteGames", 1),
  db,
  store,
  tx;
let favoriteArray = [];
request.onupgradeneeded = function() {
  let db = request.result;
  store = db.createObjectStore("FavoriteGames", { keyPath: "ID" });
  //index = store.createIndex("GameName", "GameName", { unique: false });
};
function SaveFavorites(action, result, checkBool) {
  request = indexedDB.open("FavoriteGames", 1);
  request.onerror = function(event) {
    // Do something with request.errorCode!
    console.log("There was an error", event.target.errorCode);
  };
  request.onsuccess = function(event) {
    // Do something with request.result!
    db = event.target.result;
    tx = db.transaction("FavoriteGames", "readwrite");
    store = tx.objectStore("FavoriteGames");
    //index = store.index("GameName");

    db.onerror = function(event) {
      console.log("ERROR", event.target.errorCode);
    };
    if (db) {
      if (action === "put") {
        result.forEach(function(obj) {
          if (checkBool) {
            store.put(obj);
            console.log(obj, checkBool);
          } else {
            store.delete(obj.ID);
          }
        });
      } else if (action === "get") {
        let game = store.getAll();

        game.onsuccess = function() {
          result = game.result;
        };
      }
    }
    tx.oncomplete = function() {
      db.close();
    };
  };
}

console.log(favoriteArray);
function GameItem({ id, name, image, releasedDate, rating }) {
  let ischecked = false;
  useEffect(() => {
    var dbPromise = indexedDB.open("FavoriteGames", 1);
    dbPromise.onsuccess = function(db) {
      var tx = db.transaction("store", "readonly");
      var store = tx.objectStore("store");
      return store.get("sandwich");
    };
  }, []);
  const findFav = function(e) {
    if (!ischecked) {
      favoriteArray.push({ ID: id, GameName: name });
      ischecked = true;
      console.log("checked");
    } else {
      ischecked = false;
      console.log("unchecket");
      for (let i = 0; i < favoriteArray.length; i++) {
        if (favoriteArray.includes(name)) {
          favoriteArray.splice(i, 1);
        }
      }
    }
    console.log(favoriteArray);
    SaveFavorites("put", favoriteArray, ischecked);
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
