import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import CampusForm from "./CampusForm"
import {getCampuses} from '../store/campusReducer'

const AllCampuses = (props) => {

    const dispatch = useDispatch()

    React.useEffect(()=>{
        props.handler()
        dispatch(getCampuses())
    },[])

    const campuses = useSelector(state => state.campuses.data)

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
                    <button className="delete-button">Delete</button>
                </div>
             </div>
            )}
        </div>
        <CampusForm/>
        </>
    )
}

export default AllCampuses