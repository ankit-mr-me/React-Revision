require('dotenv').config()
// import mongoose from './node_modules/mongoose/types/index.d';


const express = require('express');
const mongoose= require('mongoose');
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const app = express();


// middleware
app.use(express.json())

app.use((req , res ,next)=>{
    console.log(req.path , req.method);
    next();
})

// routes
app.use('/api/workouts' ,workoutRoutes)
app.use('/api/user' , userRoutes)



// connecting with mongo with mongoose
mongoose.connect(process.env.MONG_URI)
.then(() => {
    app.listen(process.env.PORT , ()=>{
        console.log('listening on port 4000');
        
    })
})
.catch(err => console.log(err.message))

