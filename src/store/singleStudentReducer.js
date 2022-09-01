import axios from "axios"

const initState = {
    data: {
        firstName: "Now Loading",
        lastName: "Now Loading",
        email: "Now Loading",
        imageUrl: "prof_pic.webp",
        gpa: 4.0,
        campus: {
            name: "Now Loading"
        }
    }
}

// Action types
const GET_STUDENT = "GET_STUDENT"

// Action creators

// students should be an array of objects
const _getStudent = (student) => {
    return {
        type: GET_STUDENT,
        student
    }
}

// thunk creators
export const getStudent = (id) => {
    return async (dispatch) => {
      dispatch(_getStudent(initState.data))
      const { data } = await axios.get(`/api/students/${id}`);
      dispatch(_getStudent(data));
    };
  };

export default (state=initState, action) => {
    switch (action.type) {
        case GET_STUDENT:
            return {
                data: action.student
            }
        default:
            return state
    }
}