import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--gamedpad-back--bnyc4d5dnhdn.code.run/user/login",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 15 });
        setToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
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
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
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
            <input type="submit" value="Connexion" />
          </form>
          <Link className="login-link" to={"/signup"}>
            Dont't have an account yet ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
