import React from 'react';
import './CSS/Popup.css';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../types/State";
import {Button} from "semantic-ui-react";
import {login, setPopup, showPopup} from "../../actions";
import ImdbIcon from "../Shared/ImdbIcon";


function Popup() {

    // Henter state fra redux
    const reduxState = useSelector((state: State) => state);

    // Nødvendig for redux
    const dispatch = useDispatch();

    let req = {};
    if (!!reduxState.user) {
        req = ({
            method: 'POST',
            body: JSON.stringify({userName: reduxState.user.userName, movieId: reduxState.details.movie._id}),
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
                        reduxState.details.movie.watches--;
                        reduxState.user.movies = reduxState.user.movies.filter(movieId => movieId !== reduxState.details.movie._id);
                    } else {
                        reduxState.details.movie.watches++;
                        reduxState.user.movies.push(reduxState.details.movie._id);
                    }
                    dispatch(setPopup(reduxState.details.movie));
                    dispatch(login(reduxState.user));
                }})
            .catch(error => console.log(error));
    }

    return (
        // marginRight her er 20px større fordi den blir offset av GridView
        <div className="Popup">
            <Button id={"backButtonID"} className="BackButton" onClick={() => dispatch(showPopup(false))} content='Back'
                    icon='left arrow' labelPosition='left'/>
            <div className="movieContent">
                <img alt="movie poster could not load" src={reduxState.details.movie.posterurl}/>
                <div className="info">
                    <h1>{reduxState.details.movie.title}</h1>
                    <h2>{reduxState.details.movie.year}</h2>
                    <ImdbIcon rating={reduxState.details.movie.imdbRating} height={50}/>
                    <div className="lables">
                        {!!reduxState.user ?
                            <Button id={"watchButton"} className="button"
                                disabled={reduxState.user.movies.includes(reduxState.details.movie._id)}
                                onClick={() => changeView(false)}
                                color='blue' content='Watched' icon='eye'
                                label={{
                                    basic: true,
                                    color: 'blue',
                                    pointing: 'left',
                                    content: reduxState.details.movie.watches
                                }}/> : null}
                        {!!reduxState.user && reduxState.user.movies.includes(reduxState.details.movie._id) ?
                            <Button id={"removeButton"} className="button" onClick={() => changeView(true)}
                                color='red' content='Remove from my list' icon='trash'/> :
                                null}
                    </div>
                    <h3>{reduxState.details.movie.genres.join(", ")}</h3>
                    <p>{reduxState.details.movie.storyline}</p>
                </div>
            </div>
        </div>
    )
}

export default Popup;