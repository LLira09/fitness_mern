import bcrypt from 'bcryptjs'

const coaches = [
  {
    name: 'Steve',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    image: '/images/trainer1.jpg',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis ratione fugit assumenda fugiat facere illo impedit voluptates ad unde tempora?',
    price: '299',
    isAdmin: true,
    rating: 4.5,
    numReviews: 8
  },
  {
    name: 'Austin',
    email: 'austin@example.com',
    password: bcrypt.hashSync('123456', 10),
    image: '/images/trainer4.jpg',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis ratione fugit assumenda fugiat facere illo impedit voluptates ad unde tempora?',
    price: '199',
    rating: 4.2,
    numReviews: 6
  },
  {
    name: 'Jane',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    image: '/images/trainer2.jpg',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis ratione fugit assumenda fugiat facere illo impedit voluptates ad unde tempora?',
    price: '199',
    rating: 4.8,
    numReviews: 12
  }
]

export default coaches
