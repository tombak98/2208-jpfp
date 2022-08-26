const router = require('express').Router()
const {db, Campus, Student} = require('../db/index.js')

// GET all students
router.get('/', async(req,res,next)=>{
    try {
        let campuses = await Campus.findAll({
            include: Student
        })
        res.send(campuses)
    } catch(err) {
        next(err)
    }
})

module.exports = router