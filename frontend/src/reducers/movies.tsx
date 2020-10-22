const moviesReducer = (movies = [], action: { type: string; payload: any[]; }) => {
    switch (action.type) {
        case 'setMovies':
            return action.payload;
        default:
            return movies;
    }
}
export default moviesReducer;