import React from "react"
import { useSelector, useDispatch } from "react-redux"

const AllStudents = (props) => {

    const students = useSelector(state => state.students.data)

    React.useEffect(()=>{
        props.handler()
    },[])

    return (
        <div id="students-container">
            {students.map((student)=>
            <div key={student.id} className="student">
                <img className="icons" src={student.imageUrl}/>
                <div className="student-text">
                    <h2>{student.firstName + " " + student.lastName}</h2>
                    <p>Attends {student.campus.name}</p>
                    <br/>
                    <a>Details for {student.firstName}</a>
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