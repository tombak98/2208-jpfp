const router = require('express').Router()
const {db, Student} = require('../db/index.js')

// GET all students
router.get('/', async(req,res,next)=>{
    try {
        let students = await Student.findAll()
        res.send(students)
    } catch(err) {
        next(err)
    }
})

module.exports = router