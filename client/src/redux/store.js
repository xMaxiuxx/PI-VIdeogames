import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

//thunk sirve para manejar asincronia
export const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
);