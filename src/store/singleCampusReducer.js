import axios from "axios"

const initState = {
    data: {
        id: 0,
        imageUrl: "default_campus.jpeg",
        name: "School",
        students: [],
    }
}

// Action types
const GET_CAMPUS = "GET_CAMPUS"

// Action creators

// students should be an array of objects
const _getCampus = (campus) => {
    return {
        type: GET_CAMPUS,
        campus
    }
}

// thunk creators
export const getCampus = (id) => {
    return async (dispatch) => {
      const { data } = await axios.get(`/api/campuses/${id}`);
      dispatch(_getCampus(data));
    };
  };

export default (state=initState, action) => {
    switch (action.type) {
        case GET_CAMPUS:
            return {
                data: action.campus
            }
        default:
            return state
    }
}