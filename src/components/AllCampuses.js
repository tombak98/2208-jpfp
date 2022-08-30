import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import CampusForm from "./CampusForm"
import {getCampuses} from '../store/campusReducer'
import { deleteCampus } from "../store/campusReducer"
import {getStudents} from "../store/studentReducer"

const AllCampuses = (props) => {

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

    return (
        <>
        <div id="students-container">
           {campuses.map((campus)=>
            <div key={campus.id} className="student">
                <img className="icons" src={`/${campus.imageUrl}`}/>
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