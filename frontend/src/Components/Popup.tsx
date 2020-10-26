import React, {useEffect, useState} from 'react';
import './CSS/Popup.css';
import {useDispatch, useSelector} from "react-redux";
import {state} from "../types/state";
import { Button} from "semantic-ui-react";
import {setPopup, showPopup} from "../actions";
import ImdbIcon from "./ImdbIcon";


function Popup() {
    // Henter filmen fra redux
    const movie = useSelector((state: state) => state.details.movie);

    const [viewedMovies, setViewedMovies]: any[] = useState([]);
    const [watches, setWatches] = useState(movie.watches);

    function fetchViewed(): any[] {
        try {
            const item = localStorage.getItem('viewed');
            return item ? JSON.parse(item) : []
        } catch (e) {
            return [];
        }
    }

    useEffect(() => {
        setViewedMovies(fetchViewed());
    }, [])

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Lukker popup
    function hidePopup() {
        dispatch(showPopup(false));
    }

    // Legger til en view
    function addView() {
        movie.watches++;
        setWatches(watches+1);
        fetch('http://localhost:5000/api/movie/addView/'+movie._id);
        let tempViewedMovies = viewedMovies;
        tempViewedMovies.push(movie._id);
        localStorage.setItem('viewed', JSON.stringify(tempViewedMovies));
        setViewedMovies(tempViewedMovies);
        dispatch(setPopup(movie));
    }

    return (
        // marginRight her er 20px større fordi den blir offset av GridView
        // @ts-ignore
        <div className="Popup">
            <Button className="BackButton" onClick={hidePopup} content='Back' icon='left arrow' labelPosition='left' />
            <div className="movieContent">
                <img src={movie.posterurl} />
                <div className="info">
                    <h1>{movie.title}</h1>
                    <h2>{movie.year}</h2>
                    <div className="lables">
                        <Button className="button" disabled={viewedMovies.includes(movie._id)} onClick={addView} color='blue' content='Watched' icon='eye' label={{ basic: true, color: 'blue', pointing: 'left', content: movie.watches }}/>
                        <ImdbIcon rating={movie.imdbRating} height={50}/>
                    </div>
                    <h3>{movie.genres}</h3>
                    <p>{movie.storyline}</p>
                </div>
            </div>
        </div>
    )
}

export default Popup;