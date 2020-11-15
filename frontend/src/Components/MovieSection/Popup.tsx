import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../types/State";
import {Button} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import {login} from "../../actions";
import ImdbIcon from "../Shared/ImdbIcon";
import {makeStyles} from "@material-ui/styles";


function Popup(props: { refresh: (page: number) => void }) {

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
                        reduxState.user.movies = reduxState.user.movies.filter(movieId => movieId !== reduxState.details.movie._id);
                    } else {
                        reduxState.user.movies.push(reduxState.details.movie._id);
                    }
                    dispatch(login(reduxState.user));
                    props.refresh(reduxState.page)
                }
            })
            .catch(error => console.log(error));
    }

    const classes = makeStyles({
        root: {
            margin: '0 20px 0 20px',
            display: reduxState.details.show ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center'
        },
        buttons: {
            display: 'flex',
            flexDirection: 'column',
        }
    })

    return (
        <div className={classes().root}>
            <h1>{reduxState.details.movie.title}</h1>
            <img width='400px' alt="movie poster could not load" src={reduxState.details.movie.posterurl}/>
            <h2>{reduxState.details.movie.year}</h2>
            <ImdbIcon rating={reduxState.details.movie.imdbRating} height={50}/>
            <div className={classes().buttons}>
                {!!reduxState.user ?
                    <Button id='watchButton'
                            variant='contained'
                            disabled={reduxState.user.movies.includes(reduxState.details.movie._id)}
                            onClick={() => changeView(false)}
                            color='primary'
                            endIcon={<VisibilityIcon/>}
                    >Watched</Button>
                    : null}
                {!!reduxState.user && reduxState.user.movies.includes(reduxState.details.movie._id) ?
                    <Button id='removeButton'
                            variant='contained'
                            color='secondary'
                            onClick={() => changeView(true)}
                            endIcon={<DeleteIcon/>}
                    >Remove from my list</Button>
                    :
                    null}
            </div>
            <h3>{reduxState.details.movie.genres.join(", ")}</h3>
            <p>{reduxState.details.movie.storyline}</p>
        </div>
    )
}

export default Popup;