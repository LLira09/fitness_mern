import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    orderItems: [
      {
        coach: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Coach'
        },
        qty: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],
    paymentMethod: {
      type: String,
      required: true
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String }
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false
    },
    paidAt: {
      type: Date
    }
  },
  {
    // mongoDB sets up created at/updated at
    timestamps: true
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
