import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

const AllStudents = (props) => {

    const students = useSelector(state => state.students.data)

    React.useEffect(()=>{
        props.handler()
    },[])

    return (
        <div id="students-container">
            {students.map((student)=>
            <div key={student.id} className="student">
                <img className="icons" src={`/${student.imageUrl}`}/>
                <div className="student-text">
                    <h2>{student.firstName + " " + student.lastName}</h2>
                    <br/>
                    {student.campus ? <p>Attends {student.campus.name}</p> : <p>Not Enrolled Yet!</p>}
                    <br/>
                    <Link to={`/students/${student.id}`}>Details for {student.firstName}</Link>
                </div>
                <div className="delete-text">
                    <button className="delete-button">Delete</button>
                </div>
             </div>
            )}
        </div>
    )
}

export default AllStudents