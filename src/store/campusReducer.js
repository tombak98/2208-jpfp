import axios from "axios"

const initState = {
    data: []
}

// Action types
const GET_CAMPUSES = "GET_CAMPUSES"

// Action creators

// students should be an array of objects
const _getCampuses = (campuses) => {
    return {
        type: GET_CAMPUSES,
        campuses
    }
}

// thunk creators
export const getCampuses = () => {
    return async (dispatch) => {
      const { data } = await axios.get('/api/campuses');
      dispatch(_getCampuses(data));
    };
  };

export default (state=initState, action) => {
    switch (action.type) {
        case GET_CAMPUSES:
            return {
                data: action.campuses
            }
        default:
            return state
    }
}