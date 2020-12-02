import React, { useState, useEffect } from 'react'
import { Table, Button, Form, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import {
  registerCoach,
  listCoaches,
  deleteCoach
} from '../actions/coachActions'

const UserListScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')
  const [bio, setBio] = useState('')
  const [rating, setRating] = useState(0)
  const [numReviews, setNumReviews] = useState(0)
  const [price, setPrice] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  const coachLogin = useSelector(state => state.coachLogin)
  const { coachInfo } = coachLogin

  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete

  const coachDelete = useSelector(state => state.coachDelete)
  const { success: successCoachDelete } = coachDelete

  const coachRegister = useSelector(state => state.coachRegister)
  const {
    loading: coachLoading,
    error: coachError,
    success: successRegister
  } = coachRegister

  const coachList = useSelector(state => state.coachList)
  const {
    loading: coachListLoading,
    error: coachListError,
    coaches
  } = coachList

  useEffect(() => {
    if (coachInfo && coachInfo.isAdmin) {
      dispatch(listUsers())
      dispatch(listCoaches())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, successRegister, successCoachDelete])

  const submitHandler = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        registerCoach(
          name,
          email,
          image,
          bio,
          price,
          rating,
          numReviews,
          password
        )
      )
    }
  }

  const deleteCoachHandler = id => {
    dispatch(deleteCoach(id))
  }
  const deleteHandler = id => {
    dispatch(deleteUser(id))
  }
  return (
    <>
      <Row>
        <h2>Admin</h2>
      </Row>
      <Row className='py-3'>
        <Col md={3}>
          <h4>Add Coach</h4>
          {message && <Message>{message}</Message>}
          {error && <Message>{error}</Message>}
          {successRegister && (
            <Message variant='success'>Coach Created</Message>
          )}
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
              Create
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h4>Coaches</h4>
          {coachListLoading ? (
            <Loader />
          ) : coachListError ? (
            <Message>{coachListError}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <td>NAME</td>
                  <td>PRICE</td>
                  <td>RATING</td>
                  <td>EMAIL</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {coaches.map(coach => (
                  <tr key={coach._id}>
                    <td>{coach.name}</td>
                    <td>${coach.price}</td>
                    <td>{coach.rating}</td>
                    <td>{coach.email}</td>
                    <td>
                      <Button
                        className='btn-sm'
                        variant='danger'
                        onClick={() => deleteCoachHandler(coach._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='tabel-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    className='btn-sm'
                    variant='danger'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
