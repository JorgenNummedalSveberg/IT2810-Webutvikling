import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../types/State";
import {login} from "../../actions";
import {makeStyles} from "@material-ui/styles";
import Popup from "./Popup";


function PopupContainer(props: { refresh: (page: number) => void }) {

    // Henter state fra redux
    const state = useSelector((state: State) => state);

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
                        state.user.movies = state.user.movies.filter(movieId => movieId !== state.details.movie._id);
                    } else {
                        state.user.movies.push(state.details.movie._id);
                    }
                    dispatch(login(state.user));
                    props.refresh(state.page)
                }
            })
            .catch(error => console.log(error));
    }

    const classes = makeStyles({
        root: {
            margin: '0 20px 0 20px',
            display: state.details.show ? 'flex' : 'none',
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
            movie={state.details.movie}
            changeView={changeView}
            user={state.user}
            classes={classes()}
            refresh={props.refresh}/>
    )
}

export default PopupContainer;