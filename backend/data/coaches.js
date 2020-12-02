import bcrypt from 'bcryptjs'

const coaches = [
  {
    name: 'Steve',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    image: '/images/trainer1.jpg',
    bio:
      'Muay Thai Kickboxing Champion, BJJ Brown Belt and NASM certified, All packages include working out with me twice a week',
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
      'Strength Coach, NASM certified, All packages include working out with me twice a week',
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
      'Yoga, Weight-Loss, NASM certified, All packages include working out with me twice a week',
    price: '199',
    rating: 4.8,
    numReviews: 12
  }
]

export default coaches
