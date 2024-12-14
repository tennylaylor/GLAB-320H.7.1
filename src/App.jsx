import { useState, useEffect } from "react";
import "./App.css";

// import Components
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

// must create lifting state for the data to pass to MovieDisplay and Form

function App() {
  // Constant with your API Key
  const apiKey = "97c435cd";

  // State to hold movie data
  const [movie, setMovie] = useState(null);

  // Function to get movies
  //  handle any errors that may occur within our API request try/catch
  const getMovie = async (searchTerm) => {
    try {
      // Make fetch request and store the response

      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      // Parse JSON response into a JavaScript object
      const data = await response.json();
      // Set the Movie state to the received data
      setMovie(data);
    } catch (e) {
      console.log(e);
    }
  };

  // this will run on the first render but not on subsequent renders
  useEffect(() => {
    // this will fire once on first render, and search in movie api and set the movie, need the empty array for the empty dependencies
    getMovie("Nausicaä of the Valley of the Wind");
  }, []);

  // We pass the getMovie function as a prop called moviesearch
  // pass the movie as props to display

  return (
    <>
      <div className="App">
        <Form moviesearch={getMovie} />

        <MovieDisplay movie={movie} />
      </div>
    </>
  );
}

export default App;
