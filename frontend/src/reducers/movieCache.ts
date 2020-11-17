import {Movie} from "../types/Movie";

// Reducer for lagring av filmer, legger filmer inn i en liste og danner en cache
const movieCacheReducer = (movies: Movie[] = [], action: { type: string; payload: Movie[]; }) => {
    switch (action.type) {
        case 'pushMovies':
            return movies.concat(action.payload);
        default:
            return movies;
    }
}
export default movieCacheReducer