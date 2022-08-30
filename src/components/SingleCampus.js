import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getCampus } from "../store/singleCampusReducer"
import { Link } from "react-router-dom"
import UpdateCampusForm from "./UpdateCampusForm"
import { removeStudent } from "../store/studentReducer"

const SingleCampus = (props) => {

    const dispatch = useDispatch()
    const params = useParams()
    const campus = useSelector(state => state.singleCampus.data)
    const campuses = useSelector(state => state.campuses.data)
    const students = useSelector(state => state.students.data)

    React.useEffect(()=>{
        props.handler()
        dispatch(getCampus(params.id))
    },[campuses, students])

    function unassignHandler(event) {
        event.preventDefault()
        dispatch(removeStudent(event.target.value))
    }

    return (
        <>
        <div id="single-campus-container">
            <div key={campus.id} className="single-campus">
                <img className="icons" src={`/${campus.imageUrl}`}/>
                <div className="campus-text">
                    <h1>{campus.name} Details</h1>
                    <br/>
                    <h2>({campus.students.length}) enrollments</h2>
                    <br/>
                    <h2>Address: {campus.address}</h2>
                    <br/>
                    <h2>Description: {campus.description}</h2>
                    <br/>
                    <h3>Enrollees:</h3>
                    <ul>
                        {campus.students.length > 0 ? campus.students.map(student => 
                            <span key={student.id}>
                            <li key={student.id}><Link to={`/students/${student.id}`}>{student.firstName + " " + student.lastName + "   " }
                            <button key={student.id} onClick={unassignHandler} value={student.id}>Unregister</button></Link></li>
                            </span>
                        ) : <li>None enrolled yet!</li>}
                    </ul>
                </div>
             </div>
        </div>
        <UpdateCampusForm/>
        </>
    )
}

export default SingleCampus