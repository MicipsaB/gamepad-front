import { Link, Navigate } from "react-router-dom";

const Collection = ({ token, favorites }) => {
  return token ? (
    <div className="favorites-page">
      <div className="favorites-main">
        <h2>My Collection</h2>
        <div className="favorites">
          {favorites.map((elem) => {
            return (
              <Link className="game" key={elem.id} to={`/game/${elem.id}`}>
                <img src={elem.background_image} alt="game_img" />
                <p>{elem.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Collection;
