import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import StudentForm from "./StudentForm"
import { getStudents, deleteStudent, orderLastName, orderGPA } from "../store/studentReducer"
import { getCampuses } from "../store/campusReducer"

const AllStudents = (props) => {

    const [show, setShow] = React.useState("All")

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

    function lastNameOrder(event) {
        event.preventDefault()
        dispatch(orderLastName())
    }
    
    function gpaOrder(event) {
        event.preventDefault()
        dispatch(orderGPA())
    }

    return (
        <>
        <div id="students-container">
            <div className="sorts">
                Order By:
                <button onClick={lastNameOrder}>Last Name (alphabetically)</button>
                <button onClick={gpaOrder}>GPA (highest first)</button>
            </div>
            <div className="sorts">
                Filter By:
                <button onClick={()=>setShow("All")}>All</button>
                <button onClick={()=>setShow("Registered")}>Registered</button>
                <button onClick={()=>setShow("Unregistered")}>Unregistered</button>
            </div>
            {students.filter((student)=>{
                if (show === "All") {
                    return true
                } else if (show === "Registered" && student.campusId) {
                    return true
                } else if (show === "Unregistered" && !student.campusId) {
                    return true
                } else {
                    return false
                }
            }).map((student)=>
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