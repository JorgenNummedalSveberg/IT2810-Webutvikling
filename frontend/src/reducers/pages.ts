export function pagesReducer(pages = 0, action: { type: string, payload: number }) {
    switch (action.type) {
        case 'setPages':
            return action.payload;
        default:
            return pages;
    }
}

export default pagesReducer;