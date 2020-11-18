import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import FitnessClassScreen from './screens/FitnessClassScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/fitnessclass/:id' component={FitnessClassScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
