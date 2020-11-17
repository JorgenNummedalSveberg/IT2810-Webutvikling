// Reducer for å endre sjangerlisten, setter en generisk liste som default
const genresReducer = (genres = [
    'Select genre...',
    'Biography', 'Drama',
    'History', 'Crime',
    'Fantasy', 'Mystery',
    'Comedy', 'Romance',
    'Family', 'Sci-Fi',
    'Adventure', 'Action',
    'Thriller', 'War',
    'Horror', 'Western',
    'Animation', 'Musical',
    'Sport', 'Music'
], action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'setGenres':
            return genres.concat(action.payload).sort();
        default:
            return genres;
    }
}
export default genresReducer;