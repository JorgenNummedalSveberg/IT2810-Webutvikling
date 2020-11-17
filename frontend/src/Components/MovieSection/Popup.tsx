import React from 'react';
import {Button} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import ImdbIcon from "../Shared/ImdbIcon";
import {User} from "../../types/User";
import {Movie} from "../../types/Movie";


function Popup(props: {
    refresh: (page: number) => void,
    classes: any,
    user: User,
    movie: Movie,
    changeView: (b: boolean) => void
}) {
    return (
        <div className={props.classes.root}>
            <h1>{props.movie.title}</h1>
            <img width='200px' alt="movie poster could not load" src={props.movie.posterurl}/>
            <h2>{props.movie.year}</h2>
            <ImdbIcon rating={props.movie.imdbRating} height={50}/>
            <div className={props.classes.buttons}>
                {!!props.user ?
                    <Button data-testid='watchButton'
                            variant='contained'
                            disabled={props.user.movies.includes(props.movie._id)}
                            onClick={() => props.changeView(false)}
                            color='primary'
                            endIcon={<VisibilityIcon/>}
                    >Watched</Button>
                    : null}
                {!!props.user && props.user.movies.includes(props.movie._id) ?
                    <Button data-testid='removeButton'
                            variant='contained'
                            color='secondary'
                            onClick={() => props.changeView(true)}
                            endIcon={<DeleteIcon/>}
                    >Remove from my list</Button>
                    :
                    null}
            </div>
            <h3>{props.movie.genres.join(", ")}</h3>
            <p>{props.movie.storyline}</p>
        </div>
    )
}

export default Popup;