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

// GET single student
router.get('/:id', async(req,res,next) => {
    try {
        let student = await Student.findByPk(req.params.id, {
            include: Campus
        })
        res.status(200).send(student)
    } catch (err) {
        next(err)
    }
})

module.exports = router