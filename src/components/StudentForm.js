import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addStudent } from "../store/studentReducer"
import { getStudents } from "../store/studentReducer"

const StudentForm = () => {

    const campuses = useSelector(state => state.campuses.data)

    const [form, setForm] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        gpa: null,
        imageUrl: "/prof_pic.webp",
        campus: "none"
      })
      
    const dispatch = useDispatch();
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(addStudent({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            gpa: form.gpa,
            imageUrl: form.imageUrl,
            campus: form.campus
        }));
        setForm({
            firstName: "",
            lastName: "",
            email: "",
            gpa: null,
            imageUrl: "/prof_pic.webp",
            campus: "none"
        })
      }
    
    const handleChange = props => event => {
        setForm({
          ...form,
          [props]: event.target.value
        })
      }
    
    const isFormEmpty = () => {
        if (form.firstName && form.lastName && form.email) {
            return false
        } else {
            return true
        }
    }

    return (
        <form id='campus-form' onSubmit={handleSubmit}>
            <h2>Submit New Student</h2>
            <br/>

            <label htmlFor='first-name'>First Name:</label>
            <input name='first-name' value={form.firstName || ""} onChange={handleChange("firstName")} />

            <label htmlFor='last-name'>Last Name:</label>
            <input name='last-name' value={form.lastName || ""} onChange={handleChange("lastName")} />

            <label htmlFor='email'>Email:</label>
            <input name='email' value={form.email || ""} onChange={handleChange("email")}/>

            <label htmlFor='gpa'>GPA:</label>
            <input name='gpa' value={form.gpa || ""} onChange={handleChange("gpa")}/>

            <label htmlFor='imageUrl'>Image Url:</label>
            <input name='imageUrl' value={form.imageUrl || ""} onChange={handleChange("imageUrl")}/>

            <label htmlFor='campus'>Campus</label>
            <select onChange={handleChange('campus')}>
                <option value="none">None</option>
                {campuses.map((campus)=>
                <option key={campus.id} value={campus.name}>{campus.name}</option>
                )}
            </select>

            <button type='submit' disabled={isFormEmpty() ? true:false}>Submit</button>
            {isFormEmpty() ? <div>Please input name and email</div> : ""}
        </form>
    )
}

export default StudentForm