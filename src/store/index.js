import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import studentReducer from "./studentReducer";
import campusReducer from "./campusReducer";
import singleStudentReducer from './singleStudentReducer'
import singleCampusReducer from './singleCampusReducer'

const reducers = combineReducers({
    students: studentReducer,
    campuses: campusReducer,
    singleStudent: singleStudentReducer,
    singleCampus: singleCampusReducer
})

function configureStore() {
    // return createStore(########, applyMiddleware(thunk));
    return createStore(reducers, applyMiddleware(thunk))
}

export default configureStore;