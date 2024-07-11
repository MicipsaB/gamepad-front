import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link, Navigate } from "react-router-dom";

//import components
import Multiselect from "../components/Multiselect";

import logo from "../assets/images/logo.png";

const Home = ({ token }) => {
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [genres, setgenres] = useState("");
  const [platforms, setPlatforms] = useState("");

  //   --------------States for pagination--------------
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const options = [
    { value: "action", label: "action" },
    { value: "indie", label: "indie" },
    { value: "adventure", label: "adventure" },
    { value: "role-playing-games-rpg", label: "role-playing-games-rpg" },
    { value: "strategy", label: "strategy" },
    { value: "shooter", label: "shooter" },
    { value: "casual", label: "casual" },
    { value: "simulation", label: "simulation" },
    { value: "arcade", label: "arcade" },
    { value: "platformer", label: "platformer" },
    { value: "racing", label: "racing" },
    { value: "massively-multiplayer", label: "massively-multiplayer" },
    { value: "sports", label: "sports" },
    { value: "fighting", label: "fighting" },
    { value: "family", label: "family" },
    { value: "board-games", label: "board-games" },
    { value: "educational", label: "educational" },
    { value: "card", label: "card" },
  ];

  const options2 = [
    { value: "1", label: "pc" },
    { value: "2", label: "playstation" },
    { value: "3", label: "xbox" },
    { value: "4", label: "ios" },
    { value: "5", label: "android" },
    { value: "6", label: "mac" },
    { value: "7", label: "linux" },
    { value: "8", label: "nintendo" },
    { value: "9", label: "atari" },
    { value: "10", label: "commodore-amiga" },
    { value: "11", label: "sega" },
    { value: "12", label: "3do" },
    { value: "13", label: "neogeo" },
    { value: "14", label: "web" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (genres && platforms) {
          response = await axios.get(
            `https://api.rawg.io/api/games?key=60d7259e48db427181fde0498a74e977&search=${search}&genres=${genres}&parent_platforms=${platforms}&page=${
              currentPage + 1
            }`
          );
        } else if (genres) {
          response = await axios.get(
            `https://api.rawg.io/api/games?key=60d7259e48db427181fde0498a74e977&search=${search}&genres=${genres}&page=${
              currentPage + 1
            }`
          );
        } else if (platforms) {
          response = await axios.get(
            `https://api.rawg.io/api/games?key=60d7259e48db427181fde0498a74e977&search=${search}&parent_platforms=${platforms}&page=${
              currentPage + 1
            }`
          );
        } else {
          response = await axios.get(
            `https://api.rawg.io/api/games?key=60d7259e48db427181fde0498a74e977&ordering=-released&search=${search}&page=${
              currentPage + 1
            }`
          );
        }

        setData(response.data);

        setPageCount(Math.ceil(response.data.count / 20));

        setIsLoading(false);
      } catch (error) {
        console.log("error ", error.message);
      }
    };

    fetchData();
  }, [search, genres, platforms, currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return isLoading ? (
    <p>...Loading</p>
  ) : token ? (
    <main>
      <div className="home-page">
        <div className="logo">
          <img src={logo} alt="logo" />
          <input
            type="text"
            placeholder="Search games"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <p>Search {data.count} games</p>
        </div>

        {/* --------------Pagination--------------- */}
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />

        {/* --------------Multiselect genres---------- */}
        <Multiselect options={options} setSelectedLabels={setgenres} />
        {/* --------------Multiselect platforms---------- */}
        <Multiselect options={options2} setSelectedLabels={setPlatforms} />
        <p>Most Relevant Games</p>
        <div className="games-wrapper">
          {data.results.map((elem) => {
            return (
              <Link className="game" key={elem.id} to={`/game/${elem.id}`}>
                <img src={elem.background_image} alt="game_img" />
                <p>{elem.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
