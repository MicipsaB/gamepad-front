import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Review = ({ token }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { gameId, gameTitle } = location.state;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://site--gamedpad-back--bnyc4d5dnhdn.code.run/reviews",
        {
          gameId,
          title,
          text,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/game/" + gameId);
    } catch (error) {}
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <h2>Add a review for the game</h2>
        <h2>{gameTitle}</h2>
        <form className="login-form-div review-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Review title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            value={title}
          />

          <input
            className="review-text"
            type="text"
            placeholder="Review text"
            onChange={(event) => {
              setText(event.target.value);
            }}
            value={text}
          />

          <input type="submit" value={"Add the review"} />
        </form>
      </div>
    </div>
  );
};

export default Review;
