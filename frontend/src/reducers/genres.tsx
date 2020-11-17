// Reducer for å endre sjangerlisten, setter en generisk liste som default
const genresReducer = (genres = [
    'Select genre...',
    'Action',
    'Adventure',
    'Sci-Fi',
    'Crime',
    'Drama',
    'Romance',
    'War',
    'Biography',
    'History',
    'Comedy',
    'Thriller',
    'Mystery',
    'Family',
    'Fantasy'
], action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'setGenres':
            return action.payload;
        default:
            return genres;
    }
}
export default genresReducer;