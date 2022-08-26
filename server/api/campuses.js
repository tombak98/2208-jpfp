const router = require('express').Router()
const {db, Campus} = require('../db/index.js')

// GET all students
router.get('/', async(req,res,next)=>{
    try {
        let campuses = await Campus.findAll()
        res.send(campuses)
    } catch(err) {
        next(err)
    }
})

module.exports = router