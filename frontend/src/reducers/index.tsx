import moviesReducer from "./movies";
import genresReducer from "./genres";
import {combineReducers} from "redux";
import filterReducer from "./filters";
import movieReducer from "./details";
import pageReducer from "./page";
import userReducer from "./user";


// Lager en samlet reducer slik at alt kan lagres i en enkelt store
const reducers = combineReducers({
    movies: moviesReducer,
    genres: genresReducer,
    filter: filterReducer,
    details: movieReducer,
    page: pageReducer,
    user: userReducer
})

export default reducers;