import moviesReducer from "./movies";
import genresReducer from "./genres";
import {combineReducers} from "redux";
import filterReducer from "./filters";


// Lager en samlet reducer slik at alt kan lagres i en enkelt store
const reducers = combineReducers({
    movies: moviesReducer,
    genres: genresReducer,
    filter: filterReducer
})

export default reducers;