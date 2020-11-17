import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../types/State";
import {addMyMovie, login, removeMyMovie} from "../../actions";
import {makeStyles} from "@material-ui/styles";
import Popup from "./Popup";
import {onLogin} from "../Shared/userService";
import {User} from "../../types/User";


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
                        dispatch(removeMyMovie(state.details.movie._id))
                    } else {
                        dispatch(addMyMovie(state.details.movie._id))
                    }
                    // Mock function to use on login
                    const mock = () => {
                    }
                    onLogin(state.user, mock, (user: User) => dispatch(login(user)));
                    props.refresh(state.page)
                }
            })
            .catch(error => console.log(error));
    }

    const styles = makeStyles({
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
    const classes = styles();

    return (
        <Popup
            movie={state.details.movie}
            changeView={changeView}
            user={state.user}
            classes={classes}
            refresh={props.refresh}/>
    )
}

export default PopupContainer;