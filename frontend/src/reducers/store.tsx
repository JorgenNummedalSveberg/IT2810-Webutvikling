import {createStore} from "redux";
import reducers from "../reducers";

// Store for redux, @ts-ignore delen er for å kunne se redux i redux webtools
export const store = createStore(
    reducers,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)