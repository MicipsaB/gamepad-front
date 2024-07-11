import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Signup = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://site--gamedpad-back--bnyc4d5dnhdn.code.run/user/signup",
        {
          email,
          username,
          password,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 15 });
        setToken(response.data.token);

        navigate("/");
      }
    } catch (error) {
      console.log(error);

      if (error.response.status === 409) {
        setErrorMessage("Cet email est déjà utilisé");
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-description">
          <h2>How it works</h2>
          <p>
            Log in to your free account to be able to get all features of
            Gamepad
          </p>

          <p>Add a game to your collection</p>

          <p>Leave a review for a game</p>
        </div>

        <div className="login-form-div">
          <h2>Signup</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              type="text"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
            />
            <input
              placeholder="Email"
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
            />
            <input
              placeholder="Password"
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
            />

            <input type="submit" value="Inscription" />
          </form>
          <Link className="login-link" to={"/login"}>
            Have already an account ?
          </Link>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
