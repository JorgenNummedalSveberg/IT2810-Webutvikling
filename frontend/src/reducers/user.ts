import {User} from "../types/User";

// Reducer for å sette aktiv bruker
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