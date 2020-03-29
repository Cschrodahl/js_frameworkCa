import React from "react";
//This is used for the favorite button
function FavoriteGames({ iconState, favorite }) {
  return (
    <div className="Favorite">
      <div
        className={favorite ? "active" : ""}
        onClick={event => {
          event.target.classList.toggle("active");
          iconState(event);
        }}
      ></div>
    </div>
  );
}

export default FavoriteGames;
