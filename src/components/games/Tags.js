import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
function Tags({ list }) {
  return (
    <div>
      <ListGroup>
        {list.map(function (item, index) {
          let name;
          let tagClass = "game-detail__tag--genre";

          if (item.platform) {
            name = item.platform.name;
            tagClass = "game-detail__tag--platform";
          } else {
            name = item.name;
          }

          return (
            <ListGroup.Item
              key={index}
              className={`game-detail__tag ${tagClass}`}
            >
              {name}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}

Tags.propTypes = {
  list: PropTypes.array.isRequired,
};

export default Tags;
