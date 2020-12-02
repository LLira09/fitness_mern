import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'

const Program = ({ program }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/programs/${program._id}`}>
        <Card.Img src={program.image} variant='top' />
      </Link>
      <Card.Body>
        <Card.Title as='div'>{program.name}</Card.Title>
        <Card.Text as='div'>
          {/* <Rating
            value={program.rating}
            text={`${program.numReviews} reviews`}
          /> */}
        </Card.Text>
        <Link to={`/programs/${program._id}`}>
          <Button className='mt-2'>More Info</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Program
