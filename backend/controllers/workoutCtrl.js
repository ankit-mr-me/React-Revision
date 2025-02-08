const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

// get all workout
const getAllWorkout = async (req, res) => {
    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt : -1})

    res.status(200).json(workouts)
}


// get a single workout
const getWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No workout found with that id'})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error : 'Workout not found'})
    }

    res.status(200).json(workout)
}

// create new workout

const createWorkout = async (req , res) => {
    const {title , load , reps} = req.body;

    let  emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error : 'Please fill in all fields', emptyFields})
    }

    // add doc to DB
    try {
        const user_id = req.user._id
        const workout = await Workout.create({title , load , reps , user_id });
        res.status(200).json(workout);
    } catch (err) {
        res.status(400).json({err : err.message})
    }
    // res.json({ mssg: 'Post a new workout' })
}

// delete a workout
const deleteWorkout = async (req , res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No workout found with that id'})
    }
    // delete doc from DB
    const workout = await Workout.findOneAndDelete({_id : id})

    if(!workout){
        return res.status(404).json({error : 'Workout not found'})
    }

    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req , res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No workout found with that id'})
    }

    const workout = await Workout.findByIdAndUpdate({_id : id} ,{
        ...req.body
    })

    if(!workout){
        return res.status(404).json({error : 'Workout not found'})
    }

    res.status(200).json(workout)
}


module.exports = {
    createWorkout,
    getAllWorkout,
    getWorkout,
    deleteWorkout,
    updateWorkout
}