import logo from "../assets/images/logo.png";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Header = ({ token, setToken }) => {
  return (
    <header>
      <div>
        <img src={logo} alt="logo" />

        <div>
          {token ? (
            <div>
              <Link to={"/mycollection"}>
                <button>My Collection</button>
              </Link>

              <button
                onClick={() => {
                  Cookies.remove("token");
                  setToken(null);
                }}
              >
                Se déconnecter
              </button>
            </div>
          ) : (
            <Link to={"/login"}>
              <button>Log in</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
