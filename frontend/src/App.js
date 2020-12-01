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
import CartScreen from './screens/CartScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import CreateWorkoutScreen from './screens/CreateWorkoutScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/coaches' component={CoachesScreen} exact />
          <Route path='/coaches/coach/:id' component={CoachScreen} exact />
          <Route path='/coaches/login' component={CoachLoginScreen} />

          <Route path='/profile' component={ProfileScreen} />
          <Route path='/coaches/profile' component={CoachProfileScreen} />
          <Route path='/programs/:id' component={ProgramScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route
            path='/coach/createworkout/:id'
            component={CreateWorkoutScreen}
          />
          <Route path='/admin/userlist' component={UserListScreen} />

          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
