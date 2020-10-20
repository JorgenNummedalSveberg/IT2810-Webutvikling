import React from 'react';
import './CSS/GridView.css';
import Movieposter from "./Movieposter";
import Popup from './Popup';

function GridView() {
    const movies = [
    {title: "Mulan", duration: "PT103M", year: "2017", imdbRating: "8.2", poster: "test_posters/mulan.jpg"}, 
    {title: "Back to the Future",duration: "PT103M", year: "1985", imdbRating: "8.2", poster: "test_posters/back_to_the_future.jpg"}, 
    {title: "Lion King",duration: "PT103M", year: "1994", imdbRating: "8.1", poster: "test_posters/lion_king.jpg"},
    {title: "Black Panther",duration: "PT103M", year: "2018", imdbRating: "8.0", poster: "test_posters/black_panther.jpg"},
    {title: "Harry Potter: And the Sorcerer's Stone",duration: "PT103M", year: "2002", imdbRating: "7.8", poster: "test_posters/harry_potter.png"},
    {title: "Moonlight",duration: "PT103M", year: "2017", imdbRating: "8.3", poster: "test_posters/moonlight.png"},
    {title: "Parasite",duration: "PT103M", year: "2019", imdbRating: "8.7", poster: "test_posters/parasite.jpg"},
    {title: "Spiderman: Into the spiderwerse",duration: "PT103M", year: "2019", imdbRating: "7.7", poster: "test_posters/spiderman.jpg"},
    {title: "Aladdin",duration: "PT103M", year: "2020", imdbRating: "6.8", poster: "test_posters/aladdin.jpg"},
    {title: "Blade Runner 2049",duration: "PT103M", year: "2017", imdbRating: "7.9", poster: "test_posters/blade_runner.jpg"},
    {title: "Jaws",duration: "PT103M", year: "2974", imdbRating: "8.3", poster: "test_posters/jaws.jpg"}
  ]

  const openPopup = (id:any) => {
  }
  
    return (
      <div className="GridView">
        {movies.map((movie) => (
          <Movieposter tittel={movie.title} year={movie.year} rating={movie.imdbRating} poster={movie.poster}/>
        ))}
      </div>
    );
  }
  
  export default GridView;