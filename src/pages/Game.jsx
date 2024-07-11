import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";

import { useParams } from "react-router-dom";

const Game = ({ token, handleFavorite }) => {
  const { id } = useParams();

  const [data, setData] = useState();
  const [gamesData, setGamesData] = useState(null);
  const [reviews, setReviews] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=60d7259e48db427181fde0498a74e977`
        );

        setData(response.data);

        //extract genres from the game data
        const genres = response.data.genres.map((genre) => genre.id);

        // Fetch games that have the same genres
        const genreQueries = genres.join(",");

        const gamesResponse = await axios.get(
          `https://api.rawg.io/api/games?key=60d7259e48db427181fde0498a74e977&genres=${genreQueries}`
        );

        setGamesData(gamesResponse.data.results.slice(0, 5));

        const reviewsResponse = await axios.get(
          `https://site--gamedpad-back--bnyc4d5dnhdn.code.run/reviews/${id}`
        );
        setReviews(reviewsResponse);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>...Loading</p>
  ) : token ? (
    <div className="game-main">
      <div className="game-container">
        <p>{data.name}</p>
        <div className="game-details">
          <div>
            <img
              className="game-img"
              src={data.background_image}
              alt="game-image"
            />

            {/* -----------------Favorite Button------------------- */}
            <button
              onClick={() => {
                handleFavorite({
                  id: data.id,
                  name: data.name,
                  background_image: data.background_image,
                });
              }}
            >
              Favorite
            </button>

            <Link
              to="/review"
              state={{ gameId: data.id, gameTitle: data.name }}
            >
              <button>Add a Review</button>
            </Link>
          </div>

          <div className="description-details">
            <div className="detail-span">
              <span>Platforms</span>
              <span>
                {data.platforms.map((elem) => {
                  return (
                    <span key={elem.platform.id}>{elem.platform.name} </span>
                  );
                })}
              </span>
            </div>

            <div className="detail-span">
              <span>Genre</span>
              <span>
                {data.genres.map((elem) => {
                  return <span key={elem.id}>{elem.name} </span>;
                })}
              </span>
            </div>

            <div className="detail-span">
              <span>Released date</span>
              <span>{data.released}</span>
            </div>

            <div className="detail-span">
              <span>Developers</span>
              <span>
                {data.developers.map((elem) => {
                  return <span key={elem.id}>{elem.name} </span>;
                })}
              </span>
            </div>

            <div className="detail-span">
              <span>Publishers</span>
              <span>
                {data.publishers.map((elem) => {
                  return <span key={elem.id}>{elem.name} </span>;
                })}
              </span>
            </div>

            <div className="detail-span">
              <span>Age rating</span>
              {data.esrb_rating ? <span>{data.esrb_rating.id}</span> : null}
            </div>

            <div className="detail-span">
              <span>About</span>
              <p>{data.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="title-similar-games">
        <h2>Similar Games</h2>
        <div className="similar-games">
          {gamesData.map((elem) => {
            return (
              <div className="game" key={elem.id}>
                <img src={elem.background_image} alt="game" />
                <p>{elem.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="reviews-div">
        <h2>Reviews</h2>
        <div>
          {reviews.data.map((elem) => {
            return (
              <div className="review">
                <p>{elem.title}</p>
                <p>{elem.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Game;
