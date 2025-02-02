const express = require('express')
const { 
    createWorkout ,getAllWorkout , getWorkout , deleteWorkout, updateWorkout} = require('../controllers/workoutCtrl');


const router = express.Router()


// Get all workout
router.get('/' , getAllWorkout)


// Get single workout
router.get('/:id' , getWorkout)

// post a new workout
router.post('/', createWorkout)


// delete workout
router.delete('/:id', deleteWorkout)

// update workout
router.patch('/:id', updateWorkout)

module.exports = router 