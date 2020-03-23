import React from "react";
function FavoriteGames({ favorite, star }) {
  return (
    <img
      alt="Favorite"
      src={star}
      onClick={event => {
        favorite(event);
      }}
    />
  );
}

export default FavoriteGames;
