import {Filter} from "./Filter";
import {Movie} from "./Movie";
import {User} from "./User";

export interface State {
    movies: {
        movies: Movie[],
        pages: number
    },
    genres: string[],
    filter: Filter,
    details: { show: boolean, movie: Movie },
    page: number,
    user: User,
    indexList: string[],
    movieCache: Movie[],
    pages: number
}