import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'

const FitnessClass = ({ gClass }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/fitnessclass/${gClass._id}`}>
        <Card.Img src={gClass.image} variant='top' />
      </Link>
      <Card.Body>
        <Card.Title as='div'>{gClass.name}</Card.Title>
        <Card.Text as='div'>
          <Rating value={gClass.rating} text={`${gClass.numReviews} reviews`} />
        </Card.Text>
        <Link to={`/fitnessclass/${gClass._id}`}>
          <Button className='mt-2'>More Info</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default FitnessClass
