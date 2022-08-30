const router = require('express').Router()
const {db, Campus, Student} = require('../db/index.js')

// GET all Campuss
router.get('/', async(req,res,next)=>{
    try {
        let campuses = await Campus.findAll({
            include: Student
        })
        res.status(200).send(campuses)
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

module.exports = router