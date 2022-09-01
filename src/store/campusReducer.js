import axios from "axios"

const initState = {
    data: []
}

// Action types
const GET_CAMPUSES = "GET_CAMPUSES"
const ADD_CAMPUS = "ADD_CAMPUS"
const DELETE_CAMPUS = "DELETE_CAMPUS"
const UPDATE_CAMPUS = "UPDATE_CAMPUS"

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

const _updateCampus = (campus) => {
    return {
        type: UPDATE_CAMPUS,
        campus
    }
}

// thunk creators
export const getCampuses = () => {
    return async (dispatch) => {
        dispatch(_getCampuses([{
            name: "Now Loading",
            imageUrl: "/default_campus.jpeg",
            students: [],
            id: 0
        }]))
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
        const {data} = await axios.get(`/api/campuses/${id}`)
        await axios.delete(`/api/campuses/${id}`)
        dispatch(_deleteCampus(data))
    }
}

export const updateCampus = (id, newCampus) => {
    return async (dispatch) => {
        await axios.put(`/api/campuses/${id}`, newCampus)
        dispatch(_updateCampus(newCampus))
    }
}

export const numStudentsCampus = () => {
    return async (dispatch) => {
        dispatch(_getCampuses([{
            name: "Now Loading",
            imageUrl: "/default_campus.jpeg",
            students: [],
            id: 0
        }]))
      const { data } = await axios.get('/api/campuses/sorted');
      dispatch(_getCampuses(data));
    };
}


// reducer
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
        case UPDATE_CAMPUS:
            let newArray2 = state.data.map((element) => {
                if (action.campus.id === element.id) {
                    return action.campus
                } else {
                    return element
                }
            })
            return {
                data: [...newArray2]
            }
        default:
            return state
    }
}