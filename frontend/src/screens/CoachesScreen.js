import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Coach from '../components/Coach'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listCoaches } from '../actions/coachActions'

const CoachesScreen = () => {
  const dispatch = useDispatch()

  const coachList = useSelector(state => state.coachList)
  const { loading, error, coaches } = coachList

  useEffect(() => {
    dispatch(listCoaches())
  }, [dispatch])

  return (
    <>
      <h1>Coaches</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          {coaches.map(coach => (
            <Col key={coach._id} sm={12} md={6} lg={4} xl={3}>
              <Coach coach={coach} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default CoachesScreen
