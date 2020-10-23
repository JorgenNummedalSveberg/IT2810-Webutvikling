// Reducer for lagring av filmen som skal vises i popup
import {Movie} from "../types/Movie";

const movieReducer = (details = {show: false, movie: {}}, action: { type: string; payload: {show: boolean, movie: Movie }; }) => {
    switch (action.type) {
        case 'setMovie':
            return action.payload;
        default:
            return details;
    }
}
export default movieReducer;