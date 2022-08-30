import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import StudentForm from "./StudentForm"
import { getStudents } from "../store/studentReducer"
import { deleteStudent } from "../store/studentReducer"
import { getCampuses } from "../store/campusReducer"

const AllStudents = (props) => {

    const students = useSelector(state => state.students.data)
    const campuses = useSelector(state => state.campuses.data)

    const dispatch = useDispatch()

    React.useEffect(()=>{
        props.handler()
        dispatch(getStudents())
        dispatch(getCampuses())
    },[])

    function findCampus(id) {
        for (let i = 0; i<campuses.length; i++) {
            if (campuses[i].id === id) {
                return campuses[i].name
            }
        }
        return undefined
    }

    function deleteHandler(event) {
        event.preventDefault()
        let studentId = event.target.value
        dispatch(deleteStudent(studentId))
    }

    return (
        <>
        <div id="students-container">
            {students.map((student)=>
            <div key={student.id} className="student">
                <img className="icons" src={`${student.imageUrl}`}/>
                <div className="student-text">
                    <h2>{student.firstName + " " + student.lastName}</h2>
                    <br/>
                    {student.campusId ? <p>Attends {findCampus(student.campusId)}</p> : <p>Not Enrolled Yet!</p>}
                    <br/>
                    <Link to={`/students/${student.id}`}>Details for {student.firstName}</Link>
                </div>
                <div className="delete-text">
                    <button value={student.id} onClick={deleteHandler} className="delete-button">Delete</button>
                </div>
             </div>
            )}
        </div>
        <StudentForm/>
        </>
    )
}

export default AllStudents