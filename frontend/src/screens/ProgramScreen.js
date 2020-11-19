import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

import Rating from '../components/Rating'
import { listProgramDetails } from '../actions/programActions'

const ProgramScreen = ({ match }) => {
  const dispatch = useDispatch()

  const programDetails = useSelector(state => state.programDetails)
  const { loading, error, program } = programDetails

  useEffect(() => {
    dispatch(listProgramDetails(match.params.id))
  }, [dispatch, match])
  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
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
              <ListGroup.Item>
                Description: {program.description}
              </ListGroup.Item>
              <ListGroup.Item>
                Capacity: {program.availableSpots}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProgramScreen
