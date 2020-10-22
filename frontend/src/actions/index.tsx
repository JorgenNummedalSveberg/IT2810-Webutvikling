import {filter} from "../types/filter";

export function setMovieState(movies: any[]) {
    return {
        type: 'setMovies',
        payload: movies
    }
}

export function setGenresState(genres: string[]) {
    return {
        type: 'setGenres',
        payload: genres
    }
}

export function setFilterState(filter: filter) {
    setDesc(filter.desc);
    setSearch(filter.search);
    setGenre(filter.genre);
    setSort(filter.sort);
}
export function setDesc(desc: boolean) {
    return {
        type: 'setDesc',
        payload: desc
    }
}
export function setSearch(search: string) {
    return {
        type: 'setSearch',
        payload: search
    }
}
export function setGenre(genre: string) {
    return {
        type: 'setGenre',
        payload: genre
    }
}
export function setSort(sort: string) {
    return {
        type: 'setSort',
        payload: sort
    }
}