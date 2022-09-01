import axios from "axios"

const initState = {
    data: [{
        firstName: "Now Loading",
        lastName: "Now Loading",
        email: "placeholder@gmail.com",
        imageUrl: "prof_pic.webp",
        gpa: 4.0,
        campus: {
            name: "Now Loading"
        }
    }]
}

// Action types
const GET_STUDENTS = "GET_STUDENTS"
const ADD_STUDENTS = "ADD_STUDENTS"
const DELETE_STUDENT = "DELETE_STUDENT"
const UPDATE_STUDENT = "UPDATE_STUDENT"

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

const _deleteStudent = (student) => {
    return {
        type: DELETE_STUDENT,
        student
    }
}

const _updateStudent = (student) => {
    return {
        type: UPDATE_STUDENT,
        student
    }
}

// thunk creators
export const getStudents = () => {
    return async (dispatch) => {
        dispatch(_getStudents(initState.data))
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

export const deleteStudent = (id) => {
    return async (dispatch) => {
        const { data } = await axios.get(`/api/students/${id}`)
        await axios.delete(`/api/students/${id}`)
        dispatch(_deleteStudent(data))
    }
}

export const updateStudent = (id, newStudent) => {
    return async (dispatch) => {
        await axios.put(`/api/students/${id}`, newStudent)
        dispatch(_updateStudent(newStudent))
    }
}

export const removeStudent = (id) => {
    return async (dispatch) => {
        await axios.put(`/api/students/${id}/unassign`)
        const { data } = await axios.get(`/api/students/${id}`)
        dispatch(_updateStudent(data))
    }
}

export const orderLastName = () => {
    return async (dispatch) => {
        const { data } = await axios.get('/api/students/lastname')
        dispatch(_getStudents(data))
    }
}

export const orderGPA = () => {
    return async (dispatch) => {
        const { data } = await axios.get('/api/students/gpa')
        dispatch(_getStudents(data))
    }
}


// reducer
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
        case DELETE_STUDENT:
            let newArray = state.data.filter((element) => {
                if (action.student.id === element.id) {
                    return false
                } else {
                    return true
                }
            })
            return {
                data: [...newArray]
            }
        case UPDATE_STUDENT:
            let newArray2 = state.data.map((element) => {
                if (action.student.id === element.id) {
                    return action.student
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