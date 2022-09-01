const router = require('express').Router()
const {db, Campus, Student} = require('../db/index.js')

// GET all Campuss
router.get('/', async(req,res,next)=>{
    try {
        let campuses = await Campus.findAll({
            include: Student,
            order: [
                ["name", "ASC"]
            ]
        })
        res.status(200).send(campuses)
    } catch(err) {
        next(err)
    }
})

// GET campuses ordered by number of enrolled students
router.get('/sorted', async(req,res,next)=>{
    try {
        let campuses = await Campus.findAll({
            include: Student,
            order: [
                ["name", "ASC"]
            ]
        })
        let sorted = campuses.sort(function(a,b) {
            return b.students.length - a.students.length
        })
        res.status(200).send(sorted)
    } catch(err) {
        next(err)
    }
})

// GET single campus
router.get('/:id', async(req,res,next) => {
    try {
        let campus = await Campus.findByPk(req.params.id, {
            include: Student
        })
        res.status(200).send(campus)
    } catch (err) {
        next(err)
    }
})

// POST a new campus
router.post('/', async(req,res,next) => {
    try {
        res.status(201).send(await Campus.create(req.body))
    } catch (err) {
        next(err)
    }
})

// DELETE a campus

router.delete('/:id', async(req,res,next) => {
    try {
        const campus = await Campus.findByPk(req.params.id)
        await campus.destroy()
        res.status(204).send(campus)
    } catch (err) {
        next(err)
    }
})

// PUT update a campus
router.put('/:id', async(req,res,next) => {
    try {
        const campus = await Campus.findByPk(req.params.id)
        res.status(200).send(await campus.update(req.body))
    } catch (err) {
        next(err)
    }
})

module.exports = router