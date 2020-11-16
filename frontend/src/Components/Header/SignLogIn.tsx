import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {User} from "../../types/User";
import {login, logout, myMovies} from "../../actions";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Input,
    TextField,
    Typography,
    useTheme
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

function SignLogIn(props: {
    dispatch: (f: { payload: any; type: string }| {type: string}) => void,
    classes: any,
    handlePassword: (password: string) => void,
    handleName: (name: string) => void,
    onLogin: (user: User) => void,
    addUser: (reqUser: User) => void,
    userName: string,
    password: string,
    open: boolean,
    error: false | { message: string, name: boolean, password: boolean },
    isLogged: boolean,
    refresh: () => void,
    setOpen: (b: boolean) => void}) {
    return (
        <div>
            <div className={`${props.isLogged ? props.classes.initial : props.classes.none}`}>
                <Button className={props.classes.loginButton} onClick={() => props.setOpen(true)}>Log in/Sign up</Button>
                <Dialog className={props.classes.root} open={props.open} onClose={() => props.setOpen(false)} title='Log in/Sign up'>
                    <DialogTitle>Log in/Sign up</DialogTitle>
                    {props.error?<DialogContent>
                        <Typography variant='body2' component='h1' color='error'>{props.error.message}</Typography>
                    </DialogContent>:null}
                    <DialogContent>
                        <TextField label='Username' variant='outlined' inputMode='text' error={!!props.error && props.error.name} id={"UsernameID"} autoFocus title={"Username"}
                               onChange={(e) => props.handleName(e.target.value)}
                               name={"userName"}/>
                    </DialogContent>
                    <DialogContent>
                        <TextField label='Password' variant='outlined' type='password' error={!!props.error && props.error.password} id={"PasswordID"} title={"Password"}
                               onChange={(e) => props.handlePassword(e.target.value)}
                               name={"password"}/>
                    </DialogContent>
                    <DialogActions>
                        <Button id={"loginButtonID"} onClick={() => props.onLogin({
                            userName: props.userName,
                            password: props.password,
                            movies: []
                        })} type='submit'>Log in</Button>
                        <Button id={"submitButtonID"}
                                onClick={() => props.addUser({userName: props.userName, password: props.password, movies: []})}
                                type='submit'>Sign
                            up</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div className={`${props.isLogged ? props.classes.none : props.classes.initial}`}>
                <Button onClick={() => {
                    props.dispatch(myMovies())
                    props.dispatch(logout())
                    props.refresh()
                }} className={props.classes.loginButton}>Log out</Button>
            </div>
        </div>
    )
}

export default SignLogIn;