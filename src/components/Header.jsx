import logo from "../assets/images/logo.png";
import Cookies from "js-cookie";

const Header = ({ token, setToken }) => {
  return (
    <header>
      <div>
        <img src={logo} alt="logo" />

        <div>
          {token ? (
            <div>
              <button>My Collection</button>
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
            <button>Log in</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
