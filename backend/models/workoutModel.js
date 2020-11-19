import mongoose from 'mongoose'

const workoutSchema = mongoose.Schema({
  dayOfWeeK: {
    type: String,
    required: true
  },
  typeOfWorkout: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  typeOfWorkout: {
    type: String,
    required: true
  },
  cardio: {
    type: boolean,
    required: true,
    default: false
  },
  cardioTime: {
    type: String
  },
  trained: {
    type: boolean,
    required: true,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Coach'
  }
})
