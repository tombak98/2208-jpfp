import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import studentReducer from "./studentReducer";
import campusReducer from "./campusReducer";

const reducers = combineReducers({
    students: studentReducer,
    campuses: campusReducer
})

function configureStore() {
    // return createStore(########, applyMiddleware(thunk));
    return createStore(reducers, applyMiddleware(thunk))
}

export default configureStore;