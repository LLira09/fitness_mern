import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

import Rating from '../components/Rating'
import { listCoachDetails } from '../actions/coachActions'

const CoachScreen = ({ match }) => {
  const dispatch = useDispatch()

  const coachDetails = useSelector(state => state.listCoachDetails)
  const { loading, error, coach } = coachDetails

  useEffect(() => {
    dispatch(listCoachDetails(match.params.id))
  }, [dispatch, match])
  return (
    <>
      <Link className='btn btn-dark my-3' to='/coaches'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={coach.image} alt={coach.name} fluid />
          </Col>
          <Col md={6}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{coach.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={coach.rating}
                  text={`${coach.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Bio: {coach.bio}</ListGroup.Item>
              <ListGroup.Item>NA</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}

export default CoachScreen
