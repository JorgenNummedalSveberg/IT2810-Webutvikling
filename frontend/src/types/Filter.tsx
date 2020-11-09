export interface Filter {
    desc: boolean,
    search: string,
    genre: string,
    sort: string,
    score: number[],
    year: number[],
    duration: number[],
    myMovies: boolean
}