import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import FitnessClass from '../components/FitnessClass'
import { listPrograms } from '../actions/programActions'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const programList = useSelector(state => state.programList)
  const { loading, error, programs } = programList

  useEffect(() => {
    dispatch(listPrograms())
  }, [dispatch])

  return (
    <>
      <h1>Programs</h1>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {programs.map(program => (
            <Col key={program._id} sm={12} md={6} lg={4} xl={3}>
              <FitnessClass program={program} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
