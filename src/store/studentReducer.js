import axios from "axios"

const initState = {
    data: []
}

// Action types
const GET_STUDENTS = "GET_STUDENTS"
const ADD_STUDENTS = "ADD_STUDENTS"

// Action creators

// students should be an array of objects
const _getStudents = (students) => {
    return {
        type: GET_STUDENTS,
        students
    }
}

const _addStudent = (student) => {
    return {
        type: ADD_STUDENTS,
        student
    }
}

// thunk creators
export const getStudents = () => {
    return async (dispatch) => {
      const { data } = await axios.get('/api/students');
      dispatch(_getStudents(data));
    };
  };

export const addStudent = (student) => {
    return async (dispatch) => {
        const {data:created} = await axios.post('/api/students', student)
        dispatch(_addStudent(created))
    }
}

export default (state=initState, action) => {
    switch (action.type) {
        case GET_STUDENTS:
            return {
                data: action.students
            }
        case ADD_STUDENTS:
            return {
                data: [...state.data, action.student]
            }
        default:
            return state
    }
}