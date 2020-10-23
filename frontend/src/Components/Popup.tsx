import React from 'react';
import './CSS/Popup.css';
import {Movie} from "../types/Movie";
import {useSelector} from "react-redux";
import {state} from "../types/state";


function Popup() {

    // Henter filmen fra redux
    const movie = useSelector((state: state) => state.movie);
    return (
        <div className="Popup">
            <div className="ButtonSection">
                <button>Back</button>
            </div>
            <div className="MovieSection">
                <img src={movie.posterurl} alt=""/>
                <div className="MovieInfo">
                    <h2>{movie.title}</h2>
                    <h3>{movie.year}</h3>
                    <p>{movie.storyline}</p>
                </div>
            </div>
        </div>
    )
}
export default Popup;