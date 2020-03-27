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
  const [platforms, setPlatforms] = useState(null);
  let { id } = useParams();

  const url = Games_URL + "/" + id;

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        setDetail(json);
        setGenres(json.genres);
        setPlatforms(json.parent_platforms);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner animation="border" className="spinner" />;
  }
  console.log(test);
  return (
    <Row>
      <Col md={6} className="detail-image">
        <Image src={detail.background_image} fluid />
        {genres.map(info => {
          const { name } = info;
          return <GameStats info={name}></GameStats>;
        })}
      </Col>
      <Col>
        <h1>{detail.name}</h1>
        <p>
          <b>Description: </b>{" "}
          <div dangerouslySetInnerHTML={{ __html: detail.description }}></div>
        </p>
        <p>
          <b>Website: </b>
          <a href={detail.website}>{detail.website}</a>
        </p>
      </Col>
    </Row>
  );
}
/*{detail.genres.map(info => {
        const { genres } = info;
        return <GameStats genres={genres.name}></GameStats>;
      })} */
export default GameDetail;
