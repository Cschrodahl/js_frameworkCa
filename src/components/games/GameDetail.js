import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Games_URL } from "../../constants/api";
import GameStats from "./GameStats";
function GameDetail() {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState(null);
  let { id } = useParams();

  const url = Games_URL + "/" + id;

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        setDetail(json);
        setGenres(json.genres);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [url]);

  if (loading) {
    return <Spinner animation="border" className="spinner" />;
  }
  return (
    <Row>
      <Col md={6} className="detail-image">
        <Image src={detail.background_image} fluid />
        {genres.map((info, index) => {
          const { name } = info;
          return <GameStats info={name} key={index}></GameStats>;
        })}
      </Col>
      <Col>
        <h1>{detail.name}</h1>
        <div>
          <b>Description: </b>{" "}
          <div dangerouslySetInnerHTML={{ __html: detail.description }}></div>
        </div>
        <p>
          <b>Website: </b>
          <a href={detail.website}>{detail.website}</a>
        </p>
      </Col>
    </Row>
  );
}
export default GameDetail;
