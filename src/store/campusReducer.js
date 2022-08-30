import axios from "axios"

const initState = {
    data: []
}

// Action types
const GET_CAMPUSES = "GET_CAMPUSES"
const ADD_CAMPUS = "ADD_CAMPUS"
const DELETE_CAMPUS = "DELETE_CAMPUS"

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

const _deleteCampus = (campus) => {
    return {
        type: DELETE_CAMPUS,
        campus
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

export const deleteCampus = (id) => {
    return async (dispatch) => {
        const {data} = await axios.get(`api/campuses/${id}`)
        await axios.delete(`api/campuses/${id}`)
        dispatch(_deleteCampus(data))
    }
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
        case DELETE_CAMPUS:
            let newArray = state.data.filter((element) => {
                if (action.campus.id === element.id) {
                    return false
                } else {
                    return true
                }
            })
            return {
                data: [...newArray]
            }
        default:
            return state
    }
}