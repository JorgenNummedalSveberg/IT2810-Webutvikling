import {User} from "../types/user";

// Reducer for å endre siden vi er på
const userReducer = (user = null, action: { type: string; payload: User; }) => {
    switch (action.type) {
        case 'login':
            return action.payload;
        case 'logout':
            return null;
        default:
            return user;
    }
}
export default userReducer;