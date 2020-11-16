import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../types/State";
import {login} from "../../actions";
import {makeStyles} from "@material-ui/styles";
import Popup from "./Popup";


function PopupContainer(props: { refresh: (page: number) => void }) {

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
        <Popup
            movie={reduxState.details.movie}
            changeView={changeView}
            user={reduxState.user}
            classes={classes()}
            refresh={props.refresh}/>
    )
}

export default PopupContainer;