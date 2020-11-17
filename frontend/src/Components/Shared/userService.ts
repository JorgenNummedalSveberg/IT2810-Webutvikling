// Legger til en bruker på serveren
import {User} from "../../types/User";

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

// Sjekker user input og setter error
function checkInput(reqUser: User, setError: (error: { message: string, name: boolean, password: boolean }) => void): boolean {
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

export function addUser(
    reqUser: User,
    setError: (error: { message: string, name: boolean, password: boolean }) => void,
    login: (user: User) => void): Promise<boolean> | boolean {
    let returnObject: boolean | string[] = false;
    if (checkInput(reqUser, setError)) {
        return fetch('http://localhost:5000/api/user/add', req(reqUser))
            .then(response => {
                if (response.ok) {
                    returnObject = true;
                    login(reqUser);
                    return true;
                } else {
                    setError({message: "Username is taken", name: true, password: false});
                    return false;
                }
            })
    }
    return false;
}

// Logger inn hvis brukeren finnes
export function onLogin(
    reqUser: User,
    setError: (error: { message: string, name: boolean, password: boolean }) => void,
    login: (user: User) => void): Promise<boolean> | boolean {
    if (checkInput(reqUser, setError)) {
        return fetch('http://localhost:5000/api/user?userName=' + reqUser.userName + '&password=' + reqUser.password)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(movies => {
                            reqUser.movies = movies;
                            login(reqUser)
                        })
                    return true;
                } else {
                    setError({message: "Username or password is wrong", name: true, password: true});
                    return false;
                }
            })
    }
    return false;
}