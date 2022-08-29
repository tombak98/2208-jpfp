import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {useParams} from 'react-router-dom'
import {getStudent} from '../store/singleStudentReducer'
import { Link } from "react-router-dom"

const SingleStudent = (props) => {

    const dispatch = useDispatch()
    const params = useParams()
    const student = useSelector(state => state.singleStudent.data)

    React.useEffect(()=>{
        dispatch(getStudent(params.id))
        props.handler()
    },[])

    return (
        <div id="single-campus-container">
            <div key={student.id} className="single-campus">
                <img className="icons" src={`/${student.imageUrl}`}/>
                <div className="campus-text">
                    <h1>{student.firstName + " " + student.lastName + "'s"} Details</h1>
                    <br/>
                    <h2>Email: {student.email}</h2>
                    <br/>
                    <h2>GPA: {student.gpa}</h2>
                    <br/>
                    <h2>Attends: {student.campus ? <Link to={`/campuses/${student.campus.id}`}>{student.campus.name}</Link> : "Not enrolled anywhere yet!"}</h2>
                </div>
             </div>
        </div>
    )
}

export default SingleStudent