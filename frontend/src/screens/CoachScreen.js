import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { listCoachDetails, createCoachReview } from '../actions/coachActions'
import { COACH_CREATE_REVIEW_RESET } from '../constants/coachConstants'

const CoachScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const lCoachDetails = useSelector(state => state.listCoachDetails)
  const { loading, error, coach } = lCoachDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const coachReviewCreate = useSelector(state => state.coachReviewCreate)
  const {
    success: successCoachReview,
    error: errorCoachReview
  } = coachReviewCreate

  useEffect(() => {
    if (successCoachReview) {
      setRating(0)
      setComment('')
      dispatch({ type: COACH_CREATE_REVIEW_RESET })
    }
    dispatch(listCoachDetails(match.params.id))
  }, [dispatch, match, successCoachReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = e => {
    e.preventDefault()

    dispatch(
      createCoachReview(match.params.id, {
        rating,
        comment
      })
    )
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
        <>
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
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {coach.reviews.length === 0 && (
                <Message variant='secondary'>No Reviews</Message>
              )}
              <ListGroup variant='flush'>
                {coach.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Leave a Review</h2>
                  {errorCoachReview && <Message>{errorCoachReview}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating *5 being highest</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                          <option value='4'>4</option>
                          <option value='5'>5</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit'>Submit</Button>
                    </Form>
                  ) : (
                    <Message variant='secondary'>
                      <Link to='/login'>Sign In</Link> to leave a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default CoachScreen
