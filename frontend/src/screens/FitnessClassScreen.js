import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import groupClasses from '../groupClasses'

const FitnessClassScreen = ({ match }) => {
  const gClass = groupClasses.find(g => g._id === match.params.id)

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={gClass.image} alt={gClass.name} fluid />
        </Col>
        <Col md={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{gClass.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={gClass.rating}
                text={`${gClass.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Description: {gClass.description}</ListGroup.Item>
            <ListGroup.Item>Capacity: {gClass.availableSpots}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default FitnessClassScreen
