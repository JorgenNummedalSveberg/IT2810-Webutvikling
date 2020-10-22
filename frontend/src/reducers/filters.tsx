const filterReducer = (filters = {desc:true, genre: "", search: "", sort: ""}, action: { type: string; payload: string | boolean; }) => {
    let result = filters;
    switch (action.type) {
        case 'setDesc':
            result.desc = action.payload as boolean;
            break;
        case 'setSearch':
            result.search = action.payload as string;
            break;
        case 'setGenre':
            result.genre = action.payload as string;
            break;
        case 'setSort':
            result.sort = action.payload as string;
            break;
    }
    return result;
}
export default filterReducer;