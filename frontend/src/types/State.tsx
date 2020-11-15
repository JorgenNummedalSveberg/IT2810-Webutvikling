import {Filter} from "./Filter";
import {Movie} from "./Movie";
import {User} from "./User";

export interface State {
    genres: string[],
    filter: Filter,
    details: { show: boolean, movie: Movie },
    page: number,
    user: User,
    indexList: string[],
    movieCache: Movie[],
    pages: number
}