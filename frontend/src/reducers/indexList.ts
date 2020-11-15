// Reducer for lagring av filmindex

const indexListReducer = (indexList: string[] = [], action: { type: string; payload: string[]; }) => {
    switch (action.type) {
        case 'indexList':
            return action.payload;
        default:
            return indexList;
    }
}
export default indexListReducer