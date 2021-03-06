import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice
  } = req.body
  if (orderItems && orderItems === 0) {
    res.status(400)
    throw new Error('No training packages ordered')
    return
  } else {
    const order = new Order({
      name: req.user.name,
      user: req.user._id,
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate('coach', 'name image')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order was not found')
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order was not found')
  }
})

// @desc    Get Logged in user order
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @desc    Get Logged in Coach order
// @route   GET /api/orders/mycoachorders
// @access  Private
const getMyCoachOrders = asyncHandler(async (req, res) => {
  const coach = req.coach._id
  const orders = await Order.find({ 'orderItems.coach': coach })

  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getMyCoachOrders
}
