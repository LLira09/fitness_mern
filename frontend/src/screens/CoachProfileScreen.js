import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getCoachDetails, updateCoachProfile } from '../actions/coachActions'
import { listMyCoachOrders } from '../actions/orderActions'

const CoachProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')
  const [bio, setBio] = useState('')
  const [price, setPrice] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()

  const coachDetails = useSelector(state => state.coachDetails)
  const { loading, error, coach } = coachDetails

  const coachLogin = useSelector(state => state.coachLogin)
  const { coachInfo } = coachLogin

  const coachUpdateProfile = useSelector(state => state.coachUpdateProfile)
  const { success } = coachUpdateProfile

  const orderListCoach = useSelector(state => state.orderListCoach)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListCoach

  useEffect(() => {
    if (!coachInfo) {
      history.push('/coaches/login')
    } else {
      if (!coach.name) {
        dispatch(getCoachDetails('profile'))
        dispatch(listMyCoachOrders())
      } else {
        setName(coach.name)
        setEmail(coach.email)
        setImage(coach.image)
        setBio(coach.bio)
        setPrice(coach.price)
      }
    }
  }, [dispatch, history, coachInfo, coach])

  const submitHandler = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateCoachProfile({
          id: coach._id,
          name,
          email,
          image,
          bio,
          price,
          password
        })
      )
    }
  }

  return (
    <>
      <Row>
        <h2>Welcome Back</h2>
      </Row>
      <Row>
        <Col md={3}>
          <h4>Update Profile</h4>
          {message && <Message>{message}</Message>}
          {error && <Message>{error}</Message>}
          {success && <Message variant='success'>Profile Updated</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Name'
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image Link'
                value={image}
                onChange={e => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='bio'>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type='bio'
                placeholder='Enter Bio'
                value={bio}
                onChange={e => setBio(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='price'
                placeholder='Enter Rates'
                value={price}
                onChange={e => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmpassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h4>My Clients</h4>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message>{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <td>NAME</td>
                  <td>MONTHS</td>
                  <td>DATE</td>
                  <td>TOTAL</td>
                  <td>PAID</td>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>
                      <LinkContainer to={`/coach/createworkout/${order.user}`}>
                        <Button variant='light' style={{ border: 'none' }}>
                          <u>{order.name}</u>
                        </Button>
                      </LinkContainer>
                    </td>
                    <td>{order.orderItems.map(item => item.qty)}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>{order.isPaid ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}

export default CoachProfileScreen
