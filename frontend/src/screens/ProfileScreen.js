import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { listMyWorkouts } from '../actions/workoutActions'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector(state => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const workoutList = useSelector(state => state.workoutList)
  const {
    loading: loadingWorkouts,
    error: errorWorkouts,
    workouts
  } = workoutList

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
        dispatch(listMyWorkouts())
      } else {
        setName(user.name)
        setEmail(user.email)
        setPhoneNumber(user.phoneNumber)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile({ id: user._id, name, email, phoneNumber, password })
      )
    }
  }

  return (
    <>
      <Row>
        <h2>Welcome Back {user.name}</h2>
      </Row>

      <Row>
        <Col md={12}>
          {loadingWorkouts ? (
            <Loader />
          ) : errorOrders ? (
            <Message>{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <td>WEEK</td>
                  <td>MONDAY</td>
                  <td>TUESDAY</td>
                  <td>WEDNESDAY</td>
                  <td>THURSDAY</td>
                  <td>FRIDAY</td>
                  <td>SATURDAY</td>
                  <td>SUNDAY</td>
                  <td>CARDIO</td>
                  <td>NOTES</td>
                  <td>COACH</td>
                </tr>
              </thead>
              <tbody>
                {workouts.map(workout => (
                  <tr key={workout._id}>
                    <td>{workout.week}</td>
                    <td>{workout.mondayWorkout}</td>
                    <td>{workout.tuesdayWorkout}</td>
                    <td>{workout.wednesdayWorkout}</td>
                    <td>{workout.thursdayWorkout}</td>
                    <td>{workout.fridayWorkout}</td>
                    <td>{workout.saturdayWorkout}</td>
                    <td>{workout.sundayWorkout}</td>
                    <td>{workout.cardioTime}</td>
                    <td>{workout.notes}</td>
                    <td>{workout.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
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
            <Form.Group controlId='phoneNumber'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='phoneNumber'
                placeholder='Enter phone number'
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
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
          <h4>My Training Packages</h4>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message>{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <td>ID</td>
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
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant='light' style={{ border: 'none' }}>
                          <u>{order._id}</u>
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

export default ProfileScreen
