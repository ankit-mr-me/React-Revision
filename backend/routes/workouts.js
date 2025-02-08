const express = require('express')
const { 
    createWorkout ,getAllWorkout , getWorkout , deleteWorkout, updateWorkout} = require('../controllers/workoutCtrl');
const requireAuth = require('../middleware/requireAuth')    


const router = express.Router()

// require Auth for all workout routes
router.use(requireAuth)


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