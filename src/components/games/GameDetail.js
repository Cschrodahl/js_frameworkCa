import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Games_URL } from "../../constants/api";
import Tags from "./Tags";

function GameDetail() {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  const url = Games_URL + "/" + id;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setDetail(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [url]);
  if (loading) {
    return <Spinner animation="border" className="spinner" />;
  }

  return (
    <Row className="content">
      <Col md={6} className="detail-image">
        <Image src={detail.background_image} fluid />
        <div className="game-detail__tags">
          <h2>Genres</h2>
          <Tags list={detail.genres} />
        </div>

        <div className="game-detail__tags">
          <h2>Platforms</h2>
          <Tags list={detail.platforms} />
        </div>
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
