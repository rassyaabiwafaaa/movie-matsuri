import { useState, useEffect } from "react";

import MovieCard from "./MovieCard";

import "./App.css";
import SearchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com?apikey=bbb34c58";

// bbb34c58

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch API
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  // Use Effect
  useEffect(() => {
    searchMovies("");
  }, []);

  // Rendering
  return (
    <div className="app">
      <h1>Movie Matsuri</h1>
      <div className="search">
        <input placeholder="Search for movies" value={searchTerm} type="text" onChange={(e) => setSearchTerm(e.target.value)} />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>We dont have any Movies to show, try search again with correct keyword</h2>
        </div>
      )}
    </div>
  );
}

export default App;
