import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import CampusForm from "./CampusForm"
import {getCampuses, deleteCampus, numStudentsCampus} from '../store/campusReducer'
import {getStudents} from "../store/studentReducer"

const AllCampuses = (props) => {

    const [show, setShow] = React.useState("All")

    const dispatch = useDispatch()

    React.useEffect(()=>{
        props.handler()
        dispatch(getCampuses())
        dispatch(getStudents())
    },[])

    const campuses = useSelector(state => state.campuses.data)

    function deleteHandler(event) {
        event.preventDefault()
        let campusId = event.target.value
        dispatch(deleteCampus(campusId))
    }

    function alphaOrder(event) {
        event.preventDefault()
        dispatch(getCampuses())
    }

    function numberEnrolled(event) {
        event.preventDefault()
        dispatch(numStudentsCampus())
    }

    return (
        <>
        <div id="students-container">
        <div className="sorts">
                Order By:
                <button onClick={alphaOrder}>Alphabetically</button>
                <button onClick={numberEnrolled}>Number of Enrolled Students</button>
            </div>
            <div className="sorts">
                Filter By:
                <button onClick={()=>setShow("All")}>All</button>
                <button onClick={()=>setShow("Registered")}>Has Registered Students</button>
                <button onClick={()=>setShow("Unregistered")}>No Registered Students</button>
            </div>
           {campuses.filter(function(campus) {
            if (show === "All") {
                return true
            } else if (show === "Registered" && campus.students.length > 0) {
                return true
            } else if (show === "Unregistered" && campus.students.length === 0) {
                return true
            } else {
                return false
            }
           }).map((campus)=>
            <div key={campus.id} className="student">
                <img className="icons" src={`${campus.imageUrl}`}/>
                <div className="student-text">
                    <h2>{campus.name} ({(campus.students ? campus.students.length: 0) } enrollments)</h2>
                    <br/>
                    <Link to={`/campuses/${campus.id}`}>Details for {campus.name}</Link>
                </div>
                <div className="delete-text">
                    <button onClick={deleteHandler} value={campus.id} className="delete-button">Delete</button>
                </div>
             </div>
            )}
        </div>
        <CampusForm/>
        </>
    )
}

export default AllCampuses