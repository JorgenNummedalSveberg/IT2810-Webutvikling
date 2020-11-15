// Reducer for lagring av filmer
import {Movie} from "../types/Movie";

const movieCacheReducer = (movies: Movie[] = [], action: { type: string; payload: Movie[]; }) => {
    switch (action.type) {
        case 'pushMovies':
            return movies.concat(action.payload);
        default:
            return movies;
    }
}
export default movieCacheReducer