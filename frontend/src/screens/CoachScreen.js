import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

import Rating from '../components/Rating'
import { listCoachDetails } from '../actions/coachActions'

const CoachScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()

  const lCoachDetails = useSelector(state => state.listCoachDetails)
  const { loading, error, coach } = lCoachDetails

  useEffect(() => {
    dispatch(listCoachDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
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

              <ListGroup.Item>
                <Row>
                  <Col>
                    Looking for Monthly Training? Choose a package below
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>Monthly Price: ${coach.price}</ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Months</Col>
                  <Col>
                    <Form.Control
                      as='select'
                      value={qty}
                      onChange={e => setQty(e.target.value)}
                    >
                      <option value={1}>1</option>
                      <option value={3}>3</option>
                      <option value={6}>6</option>
                      <option value={12}>12</option>
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className='btn-block'
                  type='button'
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}

export default CoachScreen
