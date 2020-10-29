// Reducer for lagring av filmen som skal vises i popup
import {Movie} from "../types/Movie";

const movieReducer = (details = {show: false, movie: {}}, action: { type: string; payload: Movie | boolean }) => {
    let returnDetails = details;
    switch (action.type) {
        case 'setMovie':
            returnDetails.movie = action.payload as Movie;
            break;
        case 'showPopup':
            returnDetails.show = action.payload as boolean;
            break;
    }

    return returnDetails;
}
export default movieReducer;