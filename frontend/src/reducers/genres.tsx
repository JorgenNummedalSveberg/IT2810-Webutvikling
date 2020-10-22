const genresReducer = (genres = [], action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'setGenres':
            return action.payload;
        default:
            return genres;
    }
}
export default genresReducer;