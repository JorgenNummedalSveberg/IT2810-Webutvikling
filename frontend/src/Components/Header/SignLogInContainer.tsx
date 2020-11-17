import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {User} from "../../types/User";
import {login} from "../../actions";
import {useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import SignLogIn from "./SignLogIn";
import {State} from "../../types/State";
import {addUser, onLogin} from "../Shared/userService";

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

    async function handleLogin(reqUser: User) {
        const result = await onLogin(reqUser, setError, (user: User) => dispatch(login(user)));
        if (result) {
            setOpen(false);
        }
    }

    async function handleSignin(reqUser: User) {
        const result = await addUser(reqUser, setError, (user: User) => dispatch(login(user)));
        if (result) {
            setOpen(false);
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

    const styles = makeStyles({
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
    const classes = styles();

    return (
        <SignLogIn
            classes={classes}
            handlePassword={handlePassword}
            handleName={handleName}
            onLogin={handleLogin}
            addUser={handleSignin}
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