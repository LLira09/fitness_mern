import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import colors from 'colors'
import morgan from 'morgan'

import programRoutes from './routes/programRoutes.js'
import userRoutes from './routes/userRoutes.js'
import coachRoutes from './routes/coachRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import workoutRoutes from './routes/workoutRoutes.js'

dotenv.config()

connectDB()

const app = express()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/programs', programRoutes)
app.use('/api/users', userRoutes)
app.use('/api/coaches', coachRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/workouts', workoutRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
      .underline.bold
  )
)
