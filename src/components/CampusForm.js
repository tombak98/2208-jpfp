import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addCampus } from "../store/campusReducer"

const CampusForm = () => {

    const [form, setForm] = React.useState({
        name: "",
        address: "",
        description: "",
      })
      
    const dispatch = useDispatch();
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(addCampus({
            name: form.name,
            address: form.address,
            description: form.description
        }));
        setForm({
            name: "",
            address: "",
            description: ""
        })
      }
    
    const handleChange = props => event => {
        setForm({
          ...form,
          [props]: event.target.value
        })
      }
    
    const isFormEmpty = () => {
        if (form.name && form.address) {
            return false
        } else {
            return true
        }
    }

    return (
        <form id='campus-form' onSubmit={handleSubmit}>
            <h2>Submit New Campus</h2>
            <br/>

            <label htmlFor='name'>Campus Name:</label>
            <input name='name' value={form.name || ""} onChange={handleChange("name")} />

            <label htmlFor='address'>Address:</label>
            <input name='address' value={form.address || ""} onChange={handleChange("address")}/>

            <label htmlFor='description'>Description:</label>
            <input name='description' value={form.description || ""} onChange={handleChange("description")}/>

            <button type='submit' disabled={isFormEmpty() ? true:false}>Submit</button>
        </form>
    )
}

export default CampusForm