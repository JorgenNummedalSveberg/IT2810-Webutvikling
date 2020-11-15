import moviesReducer from "./movies";
import genresReducer from "./genres";
import {combineReducers} from "redux";
import filterReducer from "./filters";
import movieReducer from "./details";
import pageReducer from "./page";
import userReducer from "./user";
import indexListReducer from "./indexList";
import movieCacheReducer from "./movieCache";


// Lager en samlet reducer slik at alt kan lagres i en enkelt store
const reducers = combineReducers({
    movies: moviesReducer,
    genres: genresReducer,
    filter: filterReducer,
    details: movieReducer,
    page: pageReducer,
    user: userReducer,
    indexList: indexListReducer,
    movieCache: movieCacheReducer
})

export default reducers;