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
  const [platform, setPlatforms] = useState([]);
  const [platforms, getPlatforms] = useState([]);
  let { id } = useParams();

  const url = Games_URL + "/" + id;

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        setDetail(json);
        setGenres(json.genres);
        //Getting the platforms they are located json.parent_platforms[index].platform.
        getPlatforms(function(value) {
          let item = json.parent_platforms;
          for (let key in item) {
            for (let index in item[key]) {
              value.push(item[key][index]);
            }
          }
          return value;
        });
        setPlatforms(platforms);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [url, platforms]);
  if (loading) {
    return <Spinner animation="border" className="spinner" />;
  }
  return (
    <Row className="content">
      <Col md={6} className="detail-image">
        <Image src={detail.background_image} fluid />
        <GameStats genres={genres} platform={platform}></GameStats>
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
