const router = require('express').Router()
const {db, Student, Campus} = require('../db/index.js')

// GET all students
router.get('/', async(req,res,next)=>{
    try {
        let students = await Student.findAll({
            include: Campus
        })
        res.send(students)
    } catch(err) {
        next(err)
    }
})

module.exports = router