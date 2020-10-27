import {filter} from "./filter";
import {Movie} from "./Movie";
import {User} from "./user";

export interface state {movies: any[], genres: string[], filter: filter, details: {show: boolean, movie: Movie }, page: number, user: User};