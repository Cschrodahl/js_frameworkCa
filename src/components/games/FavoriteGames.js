import React from "react";
import PropTypes from "prop-types";
//This is used for the favorite button
function FavoriteGames({ iconState, favorite }) {
  return (
    <div className="Favorite">
      <div
        className={favorite ? "active" : ""}
        onClick={(event) => {
          event.target.classList.toggle("active");
          iconState(event);
        }}
      ></div>
    </div>
  );
}
FavoriteGames.propTypes = {
  iconState: PropTypes.func,
};

export default FavoriteGames;
