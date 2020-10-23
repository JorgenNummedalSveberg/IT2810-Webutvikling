import React from 'react';
import './CSS/Popup.css';
import {Movie} from "../types/Movie";

const Popup = (props: {movie: Movie }) => (
      <div className="Popup">
          <div className="ButtonSection">
            <button>Back</button>
          </div>
          <div className="MovieSection">
            <img src={props.movie.posterurl} alt=""/>
            <div className="MovieInfo">
                <h2>{props.movie.title}</h2>
                <h3>{props.movie.year}</h3>
                <p>{props.movie.storyline}</p>
            </div>
          </div>
      </div>
)
  export default Popup;