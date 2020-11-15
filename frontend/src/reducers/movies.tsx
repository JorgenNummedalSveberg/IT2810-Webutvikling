// Reducer for lagring av filmer
import {Movie} from "../types/Movie";

const moviesReducer = (movies = {
    movies: [],
    pages: 0
}, action: { type: string; payload: { movies: Movie[], pages: number }; }) => {
    switch (action.type) {
        case 'setMovies':
            return action.payload;
        default:
            return movies;
    }
}
export default moviesReducer;