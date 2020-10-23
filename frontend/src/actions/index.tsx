// Bytter ut filmene
export function setMovieState(movies: any[]) {
    return {
        type: 'setMovies',
        payload: movies
    }
}

// Bytter ut sjangerene
export function setGenresState(genres: string[]) {
    return {
        type: 'setGenres',
        payload: genres
    }
}

// Endrer retning vi sorterer i
export function setDesc(desc: boolean) {
    return {
        type: 'setDesc',
        payload: desc
    }
}

// Endrer tittel søkekriterie
export function setSearch(search: string) {
    return {
        type: 'setSearch',
        payload: search
    }
}

// Endrer sjanger søkekriterie
export function setGenre(genre: string) {
    return {
        type: 'setGenre',
        payload: genre
    }
}

// Endrer hva vi sorterer etter
export function setSort(sort: string) {
    return {
        type: 'setSort',
        payload: sort
    }
}