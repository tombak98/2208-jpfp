import React from "react"
import { useSelector, useDispatch } from "react-redux"

const AllCampuses = (props) => {

    React.useEffect(()=>{
        props.handler()
    },[])

    const campuses = useSelector(state => state.campuses.data)

    return (
        <div id="students-container">
           {campuses.map((campus)=>
            <div key={campus.id} className="student">
                <img className="icons" src={campus.imageUrl}/>
                <div className="student-text">
                    <h2>{campus.name} ({campus.students.length} enrollments)</h2>
                    <br/>
                    <a>Details for {campus.name}</a>
                </div>
                <div className="delete-text">
                    <button className="delete-button">Delete</button>
                </div>
             </div>
            )}
        </div>
    )
}

export default AllCampuses