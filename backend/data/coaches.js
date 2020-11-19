import bcrypt from 'bcryptjs'

const coaches = [
  {
    name: 'admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    image: '/images/trainer1.jpg',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis ratione fugit assumenda fugiat facere illo impedit voluptates ad unde tempora?',
    price: '299',
    isAdmin: true
  },
  {
    name: 'Austin',
    email: 'austin@example.com',
    password: bcrypt.hashSync('123456', 10),
    image: '/images/trainer4.jpg',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis ratione fugit assumenda fugiat facere illo impedit voluptates ad unde tempora?',
    price: '199'
  },
  {
    name: 'Jane',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    image: '/images/trainer2.jpg',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis ratione fugit assumenda fugiat facere illo impedit voluptates ad unde tempora?',
    price: '199'
  }
]

export default coaches
