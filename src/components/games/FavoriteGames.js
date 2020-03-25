import React from "react";
function FavoriteGames({ favorite, star, iconState }) {
  return (
    <img
      alt="Favorite"
      src={star}
      onClick={event => {
        favorite(event);
      }}
      onMouseOver={event => {
        iconState(event);
      }}
      onMouseOut={event => {
        iconState(event);
      }}
    />
  );
}

export default FavoriteGames;
