// Reducer for lagring av filmindex som brukes til å vite hvilke filmer som skal vises
const indexListReducer = (indexList: string[] = [], action: { type: string; payload: string[]; }) => {
    switch (action.type) {
        case 'indexList':
            return action.payload;
        default:
            return indexList;
    }
}
export default indexListReducer