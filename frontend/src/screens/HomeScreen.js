import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import FitnessClass from '../components/FitnessClass'

const HomeScreen = () => {
  const [programs, setPrograms] = useState([])

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data } = await axios.get('/api/programs')

      setPrograms(data)
    }
    fetchPrograms()
  }, [])
  return (
    <>
      <h1>Programs</h1>
      <Row>
        {programs.map(program => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <FitnessClass program={program} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
