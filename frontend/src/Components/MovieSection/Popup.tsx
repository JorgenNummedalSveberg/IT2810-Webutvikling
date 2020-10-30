import React from 'react';
import './CSS/Popup.css';
import {useDispatch, useSelector} from "react-redux";
import {state} from "../../types/state";
import {Button} from "semantic-ui-react";
import {login, setPopup, showPopup} from "../../actions";
import ImdbIcon from "./ImdbIcon";


function Popup() {

    // Henter state fra redux
    const state = useSelector((state: state) => state);

    // Nødvendig for redux
    const dispatch = useDispatch();

    let req = {};
    if (!!state.user) {
        req = ({
            method: 'POST',
            body: JSON.stringify({userName: state.user.userName, movieId: state.details.movie._id}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    // Tar vekk en view og fjerner den fra lista di
    function changeView(remove: boolean) {
        fetch('http://localhost:5000/api/user/' + (remove ? 'removeMovie' : 'addMovie'), req)
            .then(response => {
                if (response.ok) {
                    if (remove) {
                        state.details.movie.watches--;
                        state.user.movies = state.user.movies.filter(movieId => movieId !== state.details.movie._id);
                    } else {
                        state.details.movie.watches++;
                        state.user.movies.push(state.details.movie._id);
                    }
                    dispatch(setPopup(state.details.movie));
                    dispatch(login(state.user));
                }})
            .catch(error => console.log(error));
    }

    return (
        // marginRight her er 20px større fordi den blir offset av GridView
        <div className="Popup">
            <Button id={"backButtonID"} className="BackButton" onClick={() => dispatch(showPopup(false))} content='Back'
                    icon='left arrow' labelPosition='left'/>
            <div className="movieContent">
                <img alt="movie poster could not load" src={state.details.movie.posterurl}/>
                <div className="info">
                    <h1>{state.details.movie.title}</h1>
                    <h2>{state.details.movie.year}</h2>
                    <ImdbIcon rating={state.details.movie.imdbRating} height={50}/>
                    <div className="lables">
                        {!!state.user ? 
                            <Button id={"watchButton"} className="button"
                                disabled={state.user.movies.includes(state.details.movie._id)}
                                onClick={() => changeView(false)}
                                color='blue' content='Watched' icon='eye'
                                label={{
                                    basic: true,
                                    color: 'blue',
                                    pointing: 'left',
                                    content: state.details.movie.watches
                                }}/> : null}
                        {!!state.user && state.user.movies.includes(state.details.movie._id) ?
                            <Button id={"removeButton"} className="button" onClick={() => changeView(true)}
                                color='red' content='Remove from my list' icon='trash'/> :
                                null}
                    </div>
                    <h3>{state.details.movie.genres.join(", ")}</h3>
                    <p>{state.details.movie.storyline}</p>
                </div>
            </div>
        </div>
    )
}

export default Popup;