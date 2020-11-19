import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'Steve',
    email: 'steve@example.com',
    phoneNumber: '555-555-5555',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Sam',
    email: 'sam@example.com',
    phoneNumber: '535-525-5155',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Frank',
    email: 'frank@example.com',
    phoneNumber: '525-525-5255',
    password: bcrypt.hashSync('123456', 10)
  }
]

export default users
