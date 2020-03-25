import React from "react";
//This is used for the favorite button
function FavoriteGames({ star, iconState }) {
  return (
    <img
      alt="Favorite"
      src={star}
      onClick={event => {
        iconState(event);
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
