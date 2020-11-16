import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {User} from "../../types/User";
import {login} from "../../actions";
import {useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import SignLogIn from "./SignLogIn";
import {State} from "../../types/State";

function SignLogInContainer(props: { isLogged: boolean, refresh: () => void }) {

    // Nødvendig for redux
    const dispatch = useDispatch();

    const user = useSelector((state: State) => state.user)

    // Holder styr på inputs
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);

    // Holder styr på error
    const [error, setError] = useState<false | { message: string, name: boolean, password: boolean }>(false);

    // Lager request for fetch
    const req = (reqUser: User) => {
        return ({
            method: 'POST',
            body: JSON.stringify(reqUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    function checkInput(reqUser: User): boolean {
        if (!reqUser.userName && !reqUser.password) {
            setError({message: 'Username and password is required', name: true, password: true})
            return false
        } else if (!reqUser.userName) {
            setError({message: 'Username is required', name: true, password: false})
            return false
        } else if (!reqUser.password) {
            setError({message: 'Password is required', name: false, password: true})
            return false
        }
        return true
    }

    // Legger til en bruker på serveren
    function addUser(reqUser: User) {
        if (checkInput(reqUser)) {
            fetch('http://localhost:5000/api/user/add', req(reqUser))
                .then(response => {
                    if (response.ok) {
                        dispatch(login(reqUser));
                        setOpen(false);
                    } else {
                        setError({message: "Username is taken", name: true, password: false});
                    }
                })
        }
    }

    // Logger inn hvis brukeren finnes
    function onLogin(reqUser: User) {
        if (checkInput(reqUser)) {
            fetch('http://localhost:5000/api/user?userName=' + reqUser.userName + '&password=' + reqUser.password)
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then(movies => {
                                reqUser.movies = movies;
                                dispatch(login(reqUser))
                                setOpen(false);
                            })
                    } else {
                        setError({message: "Username or password is wrong", name: true, password: true});
                    }
                })
        }
    }

    function handleName(value: string) {
        setError(false);
        setUsername(value);
    }

    function handlePassword(value: string) {
        setError(false);
        setPassword(value)
    }

    const theme = useTheme();

    const classes = makeStyles({
        loginButton: {
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark
            },
            borderRadius: '5px',
            margin: '10px',
            '& span': {
                fontSize: '1.8em',
                color: theme.palette.getContrastText(theme.palette.primary.main),
            }
        },
        none: {
            display: 'none'
        },
        initial: {
            display: 'initial'
        },
        root: {
            '& div > div': {
                minWidth: '300px',
            }
        }
    })
    return (
        <SignLogIn
            classes={classes()}
            handlePassword={handlePassword}
            handleName={handleName}
            onLogin={onLogin}
            addUser={addUser}
            userName={userName}
            password={password}
            isLogged={!user}
            open={open}
            error={error}
            refresh={props.refresh}
            dispatch={dispatch}
            setOpen={setOpen}/>
    )
}

export default SignLogInContainer;