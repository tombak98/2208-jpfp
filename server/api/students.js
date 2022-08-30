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

// GET students by last name
router.get('/lastname', async(req,res,next)=>{
    try{
        let students = await Student.findAll({
            include: Campus,
            order: [
                ['lastName', 'ASC']
            ]
        })
        res.send(students)
    } catch (err) {
        next(err)
    }
})

// GET students by GPA
router.get('/gpa', async(req,res,next)=>{
    try {
        let students = await Student.findAll({
            include: Campus,
            order: [
                ['gpa', 'DESC']
            ]
        })
        res.send(students)
    } catch (err) {
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

// POST new student
router.post('/', async(req,res,next) => {
    try {
        if (req.body.campus !== "none") {
        let campus = await Campus.findOne({
            where: {
                name: req.body.campus
            }
        })
        let newStudent = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gpa: req.body.gpa,
            campusId: campus.id,
            imageUrl: req.body.imageUrl
        }
        res.status(201).send(await Student.create(newStudent))
        } else {
        let newStudent = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gpa: req.body.gpa,
            campusId: null,
            imageUrl: req.body.imageUrl
        }
        res.status(201).send(await Student.create(newStudent))
        }
    } catch (err) {
        next(err)
    }
})

// DELETE a student
router.delete('/:id', async(req,res,next)=>{
    try {
        const student = await Student.findByPk(req.params.id)
        await student.destroy()
        res.status(204).send(student)
    } catch(err) {
        next(err)
    }
})

// PUT unassign a student
router.put('/:id/unassign', async(req,res,next) => {
    try {
    const student = await Student.findByPk(req.params.id)
    res.status(200).send(await student.update({
        ...student,
        campusId: null
    }))
    } catch(err) {
        next(err)
    }
})

// PUT update a student
router.put('/:id', async(req,res,next) => {
    try {
        const student = await Student.findByPk(req.params.id)
        if (req.body.campus !== "none") {
            let campus = await Campus.findOne({
                where: {
                    name: req.body.campus
                }
            })
            let newStudent = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                gpa: req.body.gpa,
                campusId: campus.id,
                imageUrl: req.body.imageUrl
            }
            res.status(200).send(await student.update(newStudent))
            } else {
            let newStudent = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                gpa: req.body.gpa,
                campusId: null,
                imageUrl: req.body.imageUrl
            }
            res.status(200).send(await student.update(newStudent))
            }
    } catch (err) {
        next(err)
    }
})

module.exports = router