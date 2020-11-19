import mongoose from 'mongoose'

const programReviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const programSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    days: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    reviews: [programReviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0
    },
    availableSpots: {
      type: Number,
      required: true,
      default: 0
    },
    signedUp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coach'
    }
  },
  {
    timestamps: true
  }
)

const Program = mongoose.model('Program', programSchema)

export default Program
