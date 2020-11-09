import React, {useState} from "react";
import {Button, Input, Modal, Message} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {User} from "../../types/User";
import {login} from "../../actions";

function SignLogIn() {

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Holder styr på inputs
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

    return (
        <Modal centered size={"mini"}
               trigger={<Button style={{zIndex: '1000000'}}>Log in/Sign up</Button>}
               closeIcon>
            <Modal.Header>Log in / Sign in</Modal.Header>
            {error ? (
                <Modal.Content>
                   <Message compact error content={error.message}/>
                </Modal.Content>
            ) : null}
            <Modal.Content>
                <Input error={!!error} id={"UsernameID"} autoFocus label={"Username"} onChange={(e, {value}) => handleNameChange(value)}
                       name={"userName"} placeholder='Username'/>
            </Modal.Content>
            <Modal.Content>
                <Input type={"password"} error={!!error && error.log} id={"PasswordID"} label={"Password"} onChange={(e, {value}) => handlePasswordChange(value)}
                       name={"password"} placeholder='Password'/>
            </Modal.Content>
            <Modal.Actions>
                <Button id={"loginButtonID"} onClick={() => onLogin({
                    userName: userName,
                    password: password,
                    movies: []
                })} type='submit'>Log in</Button>
                <Button id={"submitButtonID"}
                        onClick={() => addUser({userName: userName, password: password, movies: []})} type='submit'>Sign
                    up</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default SignLogIn;