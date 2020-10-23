// Samlet reducer for alle filterene
const filterReducer = (filters = {desc:true, genre: "", search: "", sort: ""}, action: { type: string; payload: string | boolean; }) => {
    let result = filters;
    switch (action.type) {
        // Endrer retning vi sorterer i
        case 'setDesc':
            result.desc = action.payload as boolean;
            break;
        // Endrer tittel søkekriterie
        case 'setSearch':
            result.search = action.payload as string;
            break;
        // Endrer sjanger søkekriterie
        case 'setGenre':
            result.genre = action.payload as string;
            break;
        // Endrer hva vi sorterer etter
        case 'setSort':
            result.sort = action.payload as string;
            break;
    }
    return result;
}
export default filterReducer;