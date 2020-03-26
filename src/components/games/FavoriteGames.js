import React from "react";
//This is used for the favorite button
function FavoriteGames({ iconState, favorite }) {
  return (
    <div className="Favorite">
      <div
        className={favorite}
        onClick={event => {
          iconState(event);
        }}
      ></div>
    </div>
  );
}

export default FavoriteGames;
