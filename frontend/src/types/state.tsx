import {filter} from "./filter";
import {Movie} from "./Movie";

export interface state {movies: any[], genres: string[], filter: filter, details: {show: boolean, movie: Movie }, minScore: number};