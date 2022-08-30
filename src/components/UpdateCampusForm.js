import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addCampus } from "../store/campusReducer"
import {updateCampus} from "../store/campusReducer"
import { useParams } from "react-router-dom"

const UpdateCampusForm = () => {

    const campus = useSelector(state => state.singleCampus.data)
    const [form, setForm] = React.useState({
        name: "",
        address: "",
        description: "",
      })
      
    const dispatch = useDispatch();
    const params = useParams()
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(updateCampus(params.id,{
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

    React.useEffect(()=>{
        setForm({
            name: campus.name,
            address: campus.address,
            description: campus.description
        })
    },[campus])

    return (
        <form id='campus-form' onSubmit={handleSubmit}>
            <h2>Update Campus</h2>
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

export default UpdateCampusForm