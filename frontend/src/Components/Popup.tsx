import React, {useState} from 'react';
import './CSS/Popup.css';
import {useDispatch, useSelector} from "react-redux";
import {state} from "../types/state";
import {Button} from "semantic-ui-react";
import {login, setPopup, showPopup} from "../actions";
import ImdbIcon from "./ImdbIcon";


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

    function postView(action: string) {
        fetch('http://localhost:5000/api/user/'+action, req)
    }

    // Legger til en view og legger den til i lista di
    function addView() {
        fetch('http://localhost:5000/api/user/addMovie', req)
            .then(response => {
                if (response.ok) {
                    movie.watches++;
                    setWatches(watches+1);
                    postView("addMovie");
                    let tempViewedMovies = user.movies;
                    tempViewedMovies.push(movie._id);
                    user.movies = tempViewedMovies;
                    dispatch(login(user));
                    dispatch(setPopup(movie));
                }
            })
    }

    // Tar vekk en view og fjerner den fra lista di
    function removeView() {
        fetch('http://localhost:5000/api/user/removeMovie', req)
            .then(response => {
                if (response.ok) {
                    movie.watches--;
                    setWatches(watches-1);
                    user.movies = user.movies.filter(movieId => movieId !== movie._id);;
                    dispatch(login(user));
                    dispatch(setPopup(movie));
                }
            })

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
                        {!!user && user.movies.includes(movie._id) ? <Button id={"removeButton"} className="button" onClick={removeView}
                            color='red' content='Remove from my list' icon='trash'/> : null}
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