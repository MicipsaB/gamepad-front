import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

//import pages
import Home from "./pages/Home";
import Game from "./pages/Game";
import Collection from "./pages/Collection";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Review from "./pages/Review";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  // State that contains favorites
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = Cookies.get("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  //function that handles cookie favorite
  const handleFavorite = (item) => {
    console.log(item);
    if (favorites.find((element) => element.id === item.id)) {
      console.log("includes");
      const updatedFavorites = favorites.filter((elem) => elem.id !== item.id);
      setFavorites(updatedFavorites);
      console.log(updatedFavorites);
      Cookies.set("favorites", JSON.stringify(updatedFavorites), {
        expires: 7,
      });
    } else {
      console.log("not include");
      const updatedFavorites = [...favorites, item];
      setFavorites(updatedFavorites);
      console.log(favorites);
      Cookies.set("favorites", JSON.stringify(updatedFavorites), {
        expires: 7,
      });
    }
  };

  return (
    <Router>
      <Header token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home token={token} />} />

        <Route
          path="/game/:id"
          element={<Game token={token} handleFavorite={handleFavorite} />}
        />

        <Route
          path="/mycollection"
          element={<Collection token={token} favorites={favorites} />}
        />

        <Route path="/login" element={<Login setToken={setToken} />} />

        <Route path="/signup" element={<Signup setToken={setToken} />} />

        <Route path="/review" element={<Review token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
