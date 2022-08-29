import React from "react";
import {Link, Routes, Route} from 'react-router-dom'
import AllStudents from "./components/AllStudents";
import AllCampuses from "./components/AllCampuses";
import {useSelector, useDispatch} from 'react-redux'
import {getCampuses} from './store/campusReducer'
import {getStudents} from './store/studentReducer'
import HomePage from "./components/HomePage";
import SingleCampus from './components/SingleCampus'
import SingleStudent from './components/SingleStudent'


function App(){

    const [whichPage, setWhichPage] = React.useState("")
    const students = useSelector(state => state.students.data)
    const campuses = useSelector(state => state.campuses.data)
    const dispatch = useDispatch()

    React.useEffect(()=>{
        dispatch(getStudents())
        dispatch(getCampuses())
    },[])

    const studentPageHandler = () => {
        setWhichPage("students")
    }

    const campusesPageHandler = () => {
        setWhichPage("campuses")
    }

    return(
        <>
        <div id="header-container">
            <h1>WELCOME TO COLLEGE</h1>
        </div>
        <nav id="navbar">
            <Link to="/students" className={"navlink" + (whichPage === "students" ? " selected":"")}>Students ({students.length})</Link>
            <Link to="/campuses" className={"navlink" + (whichPage === "campuses" ? " selected":"")}>Campuses ({campuses.length})</Link>
        </nav>
        <div id="main-body">
        <Routes>
            <Route index path="/" element={<HomePage/>}/>
            <Route path="/students" element={<AllStudents handler={studentPageHandler}/>}/>
            <Route path="/campuses" element={<AllCampuses handler={campusesPageHandler}/>}/>
            <Route path="/students/:id" element={<SingleStudent handler={studentPageHandler}/>}/>
            <Route path="/campuses/:id" element={<SingleCampus handler={campusesPageHandler}/>}/>
        </Routes>
        </div>
        </>

    )
}

export default App;