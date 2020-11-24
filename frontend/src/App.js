import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProgramScreen from './screens/ProgramScreen'
import LoginScreen from './screens/LoginScreen'
import CoachLoginScreen from './screens/CoachLoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import CoachProfileScreen from './screens/CoachProfileScreen'
import CoachScreen from './screens/CoachScreen'
import CoachesScreen from './screens/CoachesScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/coaches' component={CoachesScreen} exact />
          <Route path='/coaches/coach/:id' component={CoachScreen} exact />
          <Route path='/coaches/login' component={CoachLoginScreen} />

          <Route path='/profile' component={ProfileScreen} />
          <Route path='/coaches/profile' component={CoachProfileScreen} />
          <Route path='/programs/:id' component={ProgramScreen} />

          <Route path='/register' component={RegisterScreen} />

          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
