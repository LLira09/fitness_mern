import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createUserWorkout } from '../actions/workoutActions'
import { WORKOUT_CREATE_RESET } from '../constants/workoutConstants'

const CreateWorkoutScreen = ({ history, match }) => {
  const [week, setWeek] = useState('')
  const [mondayWorkout, setMondayWorkout] = useState('')
  const [tuesdayWorkout, setTuesdayWorkout] = useState('')
  const [wednesdayWorkout, setWednesdayWorkout] = useState('')
  const [thursdayWorkout, setThursdayWorkout] = useState('')
  const [fridayWorkout, setFridayWorkout] = useState('')
  const [saturdayWorkout, setSaturdayWorkout] = useState('')
  const [sundayWorkout, setSundayWorkout] = useState('')
  const [cardioTime, setCardioTime] = useState('')
  const [notes, setNotes] = useState('')
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const coachLogin = useSelector(state => state.coachLogin)
  const { coachInfo } = coachLogin

  const workoutCreate = useSelector(state => state.workoutCreate)
  const { success: successWorkout } = workoutCreate

  useEffect(() => {
    if (!coachInfo) {
      history.push('/coaches/login')
    }
    if (successWorkout) {
      setWeek('')
      setMondayWorkout('')
      setTuesdayWorkout('')
      setWednesdayWorkout('')
      setThursdayWorkout('')
      setFridayWorkout('')
      setSaturdayWorkout('')
      setSundayWorkout('')
      setCardioTime('')
      setNotes('')
      setName('')
    }
  }, [dispatch, history, coachInfo, successWorkout])

  const submitHandler = e => {
    e.preventDefault()

    dispatch(
      createUserWorkout(match.params.id, {
        week,
        mondayWorkout,
        tuesdayWorkout,
        wednesdayWorkout,
        thursdayWorkout,
        fridayWorkout,
        saturdayWorkout,
        sundayWorkout,
        cardioTime,
        notes,
        name,
        coach: coachInfo._id
      })
    )
  }
  return (
    <>
      <Link className='btn btn-dark my-3' to='/coaches/profile'>
        Go Back
      </Link>
      <Row>
        <h2>Set Clients Workouts</h2>
      </Row>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='week'>
                  <Form.Label>Week</Form.Label>
                  <Form.Control
                    type='number'
                    value={week}
                    onChange={e => setWeek(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='mondayWorkout'>
                  <Form.Label>Mondays Workout</Form.Label>
                  <Form.Control
                    as='textarea'
                    row='2'
                    value={mondayWorkout}
                    onChange={e => setMondayWorkout(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='tuesdayWorkout'>
                  <Form.Label>Tuesdays Workout</Form.Label>
                  <Form.Control
                    as='textarea'
                    row='2'
                    value={tuesdayWorkout}
                    onChange={e => setTuesdayWorkout(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='wednesdayWorkout'>
                  <Form.Label>Wednesdays Workout</Form.Label>
                  <Form.Control
                    as='textarea'
                    row='2'
                    value={wednesdayWorkout}
                    onChange={e => setWednesdayWorkout(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='thursdayWorkout'>
                  <Form.Label>Thursdays Workout</Form.Label>
                  <Form.Control
                    as='textarea'
                    row='2'
                    value={thursdayWorkout}
                    onChange={e => setThursdayWorkout(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='fridayWorkout'>
                  <Form.Label>Fridays Workout</Form.Label>
                  <Form.Control
                    as='textarea'
                    row='2'
                    value={fridayWorkout}
                    onChange={e => setFridayWorkout(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='saturdayWorkout'>
                  <Form.Label>Saturdays Workout</Form.Label>
                  <Form.Control
                    as='textarea'
                    row='2'
                    value={saturdayWorkout}
                    onChange={e => setSaturdayWorkout(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='sundayWorkout'>
                  <Form.Label>Sundays Workout</Form.Label>
                  <Form.Control
                    as='textarea'
                    row='2'
                    value={sundayWorkout}
                    onChange={e => setSundayWorkout(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='cardioTime'>
                  <Form.Label>Cardio</Form.Label>
                  <Form.Control
                    type='cardioTime'
                    placeholder='Cardio'
                    value={cardioTime}
                    onChange={e => setCardioTime(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='notes'>
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    type='notes'
                    placeholder='Coaches notes...'
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='name'>
                  <Form.Label>Coaches Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Coaches name...'
                    value={name}
                    onChange={e => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type='submit' className='btn-block'>
                  Submit
                </Button>
              </Form>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default CreateWorkoutScreen
