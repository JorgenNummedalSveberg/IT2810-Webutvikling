import {User} from "../types/User";

// Reducer for å sette aktiv bruker
const userReducer = (user: User | null = null, action: { type: string; payload: User | string; }) => {
    switch (action.type) {
        case 'login':
            return action.payload;
        case 'logout':
            return null;
        case 'addMyMovie':
            user?.movies.push(action.payload as string);
            return user;
        case 'removeMyMovie':
            if (user) {
                user.movies = user.movies.filter(movieId => movieId !== action.payload as string);
            }
            return user;
        default:
            return user;
    }
}
export default userReducer;