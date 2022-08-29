import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getCampus } from "../store/singleCampusReducer"
import { Link } from "react-router-dom"

const SingleCampus = (props) => {

    const dispatch = useDispatch()
    const params = useParams()
    const campus = useSelector(state => state.singleCampus.data)

    React.useEffect(()=>{
        props.handler()
        dispatch(getCampus(params.id))
    },[])

    return (
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
                            <li key={student.id}><Link to={`/students/${student.id}`}>{student.firstName + " " + student.lastName }</Link></li>
                        ) : <li>None enrolled yet!</li>}
                    </ul>
                </div>
             </div>
        </div>
    )
}

export default SingleCampus