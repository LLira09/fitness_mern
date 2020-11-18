import React from 'react'
import { Row, Col } from 'react-bootstrap'
import groupClasses from '../groupClasses'
import FitnessClass from '../components/FitnessClass'

const HomeScreen = () => {
  return (
    <>
      <h1>Group Classes</h1>
      <Row>
        {groupClasses.map(gClass => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <FitnessClass gClass={gClass} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
