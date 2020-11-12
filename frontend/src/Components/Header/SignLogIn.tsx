import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {User} from "../../types/User";
import {login, logout} from "../../actions";
import {Button, Dialog, Input, DialogContent, DialogTitle, DialogActions} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

function SignLogIn(props: {isLogged: boolean}) {

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Holder styr på inputs
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);

    // Holder styr på error
    const [error, setError] = useState<false | {message: string, log: boolean }>(false);

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

    // Legger til en bruker på serveren
    function addUser(reqUser: User) {
        setOpen(false);
        fetch('http://localhost:5000/api/user/add', req(reqUser))
            .then(response => {
                if (response.ok) {
                    dispatch(login(reqUser));
                } else {
                    setError({message: "Username is taken", log: false});
                }})
    }

    // Logger inn hvis brukeren finnes
    function onLogin(user: User) {
        setOpen(false);
        fetch('http://localhost:5000/api/user?userName=' + user.userName + '&password='+user.password)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(movies => {
                            user.movies = movies;
                            dispatch(login(user))
                        })
                } else {
                    setError({message: "Username or password is wrong", log: true});
                }})
    }

    // @ts-ignore
    function handleNameChange(value: string) {
        setError(false);
        setUsername(value);
    }

    // @ts-ignore
    function handlePasswordChange(value: string) {
        setError(false);
        setPassword(value)
    }

    const classes = makeStyles({
        loginRoot: {
            backgroundColor: 'rgb(200, 200, 200, 0.5)',
            borderRadius: '5px',
            margin: '10px',
            '& span': {
                fontSize: '1.8em',
                color: 'white',
            }
        }
    })
    return (
        props.isLogged ?
            (<div>
                <Button className={classes().loginRoot} onClick={()=> setOpen(true)} >Log in/Sign up</Button>
                <Dialog open={open} onClose={()=> setOpen(false)} title='Log in/Sign up'>
                    <DialogTitle>Log in/Sign up</DialogTitle>
                    <DialogContent>
                            <Input error={!!error} id={"UsernameID"} autoFocus title={"Username"} onChange={(e) => handleNameChange(e.target.value)}
                                   name={"userName"} placeholder='Username'/>
                    </DialogContent>
                    <DialogContent>
                        <Input type={"password"} error={!!error && error.log} id={"PasswordID"} title={"Password"} onChange={(e) => handlePasswordChange(e.target.value)}
                               name={"password"} placeholder='Password'/>
                    </DialogContent>
                    <DialogActions>
                        <Button id={"loginButtonID"} onClick={() => onLogin({
                            userName: userName,
                            password: password,
                            movies: []
                        })} type='submit'>Log in</Button>
                        <Button id={"submitButtonID"}
                                onClick={() => addUser({userName: userName, password: password, movies: []})} type='submit'>Sign
                            up</Button>
                    </DialogActions>
                </Dialog>
            </div>):
            (<Button onClick={() => dispatch(logout())} style={{zIndex: 1000000}}>Log out</Button>)

    )
}

export default SignLogIn;