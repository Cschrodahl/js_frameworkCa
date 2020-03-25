import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

function FavoriteItem({ name, image, releasedDate, rating, id }) {
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
      </Card.Body>
    </Card>
  );
}

FavoriteItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  releasedDate: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

export default FavoriteItem;
