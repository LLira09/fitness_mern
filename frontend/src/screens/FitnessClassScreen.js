import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import Rating from '../components/Rating'

const FitnessClassScreen = ({ match }) => {
  const [program, setProgram] = useState({})

  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await axios.get(`/api/programs/${match.params.id}`)

      setProgram(data)
    }
    fetchProgram()
  }, [match])
  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={program.image} alt={program.name} fluid />
        </Col>
        <Col md={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{program.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={program.rating}
                text={`${program.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Description: {program.description}</ListGroup.Item>
            <ListGroup.Item>Capacity: {program.availableSpots}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default FitnessClassScreen
