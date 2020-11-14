import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import App from "./App";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducers from "./reducers";

// Lager samlet redux store
const store = createStore(
    reducers
)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);