import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'

const Coach = ({ coach }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/coaches/${coach._id}`}>
        <Card.Img src={coach.image} variant='top' />
      </Link>
      <Card.Body>
        <Card.Title as='div'>{coach.name}</Card.Title>
        <Card.Text as='div'>
          <Rating value={coach.rating} text={`${coach.numReviews} reviews`} />
        </Card.Text>
        <Link to={`/coaches/${coach._id}`}>
          <Button className='mt-2'>More Info</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Coach
