import mongoose from 'mongoose'

const workoutSchema = mongoose.Schema(
  {
    week: {
      type: Number,
      required: true
    },
    mondayWorkout: {
      type: String,
      required: true
    },
    tuesdayWorkout: {
      type: String,
      required: true
    },
    wednesdayWorkout: {
      type: String,
      required: true
    },
    thursdayWorkout: {
      type: String,
      required: true
    },
    fridayWorkout: {
      type: String,
      required: true
    },
    saturdayWorkout: {
      type: String,
      required: true
    },
    sundayWorkout: {
      type: String,
      required: true
    },
    notes: {
      type: String,
      required: true
    },
    cardio: {
      type: Boolean,
      required: true,
      default: false
    },
    cardioTime: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: { type: String, required: true },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Coach'
    }
  },
  {
    timestamps: true
  }
)

const Workout = mongoose.model('Workout', workoutSchema)

export default Workout
