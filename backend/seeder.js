import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import coaches from './data/coaches.js'
import programs from './data/programs.js'
import User from './models/userModel.js'
import Coach from './models/coachModel.js'
import Program from './models/programModel.js'
import Order from './models/orderModel.js'
import Review from './models/reviewModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Coach.deleteMany()
    await User.deleteMany()
    await Program.deleteMany()

    const createdCoaches = await Coach.insertMany(coaches)
    const adminCoach = createdCoaches[0]._id
    await User.insertMany(users)
    const samplePrograms = programs.map(program => {
      return { ...program, coach: adminCoach }
    })

    await Program.insertMany(samplePrograms)
    console.log('Data Imported'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}.red.inverse`)
    process.exit
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Coach.deleteMany()
    await User.deleteMany()
    await Program.deleteMany()

    console.log('Data Destroyed'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}.red.inverse`)
    process.exit
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
