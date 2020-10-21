import moviesReducer from "./movies";
import genresReducer from "./genres";
import {combineReducers} from "redux";
import filterReducer from "./filters";

const reducers = combineReducers({
    movies: moviesReducer,
    genres: genresReducer,
    filter: filterReducer
})

export default reducers;