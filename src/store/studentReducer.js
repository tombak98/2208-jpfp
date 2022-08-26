import axios from "axios"

const initState = {
    data: []
}

// Action types
const GET_STUDENTS = "GET_STUDENTS"

// Action creators

// students should be an array of objects
const _getStudents = (students) => {
    return {
        type: GET_STUDENTS,
        students
    }
}

// thunk creators
export const getStudents = () => {
    return async (dispatch) => {
      const { data } = await axios.get('/api/students');
      dispatch(_getStudents(data));
    };
  };

export default (state=initState, action) => {
    switch (action.type) {
        case GET_STUDENTS:
            return {
                data: action.students
            }
        default:
            return state
    }
}