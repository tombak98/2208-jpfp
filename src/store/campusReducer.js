import axios from "axios"

const initState = {
    data: []
}

// Action types
const GET_CAMPUSES = "GET_CAMPUSES"
const ADD_CAMPUS = "ADD_CAMPUS"

// Action creators

// students should be an array of objects
const _getCampuses = (campuses) => {
    return {
        type: GET_CAMPUSES,
        campuses
    }
}

const _addCampus = (campus) => {
    return {
        type: ADD_CAMPUS,
        campus: campus
    }
}

// thunk creators
export const getCampuses = () => {
    return async (dispatch) => {
      const { data } = await axios.get('/api/campuses');
      dispatch(_getCampuses(data));
    };
  };

export const addCampus = (campus) => {
    return async (dispatch) => {
        const { data: created } = await axios.post('/api/campuses', campus);
        dispatch(_addCampus(created));
      };
}

export default (state=initState, action) => {
    switch (action.type) {
        case GET_CAMPUSES:
            return {
                data: action.campuses
            }
        case ADD_CAMPUS:
            return {
                data: [...state.data, action.campus]
            }
        default:
            return state
    }
}