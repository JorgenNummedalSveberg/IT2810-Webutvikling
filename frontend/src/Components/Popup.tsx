import React, {useEffect, useState} from 'react';
import './CSS/Popup.css';
import {useDispatch, useSelector} from "react-redux";
import {state} from "../types/state";
import {Button, Form} from "semantic-ui-react";
import {login, logout, setPopup, showPopup} from "../actions";
import ImdbIcon from "./ImdbIcon";
import {User} from "../types/user";


function Popup() {
    // Henter filmen fra redux
    const movie = useSelector((state: state) => state.details.movie);
    // Henter innlogget bruker
    const user = useSelector((state: state) => state.user);

    const [watches, setWatches] = useState(movie.watches);

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Lukker popup
    function hidePopup() {
        dispatch(showPopup(false));
    }
    let req = {};
    if (!!user) {
        req = ({
            method: 'POST',
            body: JSON.stringify({userName: user.userName, movieId: movie._id}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    function postView() {
        fetch('http://localhost:5000/api/user/addMovie', req)
    }

    // Legger til en view
    function addView() {
        movie.watches++;
        setWatches(watches+1);
        postView();
        let tempViewedMovies = user.movies;
        tempViewedMovies.push(movie._id);
        user.movies = tempViewedMovies;
        dispatch(login(user));
        dispatch(setPopup(movie));
    }

    return (
        // marginRight her er 20px større fordi den blir offset av GridView
        // @ts-ignore
        <div className="Popup">
            <Button id={"backButtonID"} className="BackButton" onClick={hidePopup} content='Back' icon='left arrow' labelPosition='left' />
            <div className="movieContent">
                <img src={movie.posterurl} />
                <div className="info">
                    <h1>{movie.title}</h1>
                    <h2>{movie.year}</h2>
                    <div className="lables">
                        {!!user ? <Button id={"watchButton"} className="button" disabled={user.movies.includes(movie._id)} onClick={addView}
                                 color='blue' content='Watched' icon='eye'
                                 label={{basic: true, color: 'blue', pointing: 'left', content: movie.watches}}/>: null}
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