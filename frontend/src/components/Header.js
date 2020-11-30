import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { coachLogout } from '../actions/coachActions'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const coachLogin = useSelector(state => state.coachLogin)
  const { coachInfo } = coachLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  const coachLogoutHandler = () => {
    dispatch(coachLogout())
  }
  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Fitness Trainer</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <NavDropdown title='Coaches' id='basic-nav-dropdown'>
                <LinkContainer to='/coaches'>
                  <NavDropdown.Item>Coaches</NavDropdown.Item>
                </LinkContainer>
                {coachInfo || userInfo ? null : (
                  <LinkContainer to='/coaches/login'>
                    <NavDropdown.Item>Coach Login</NavDropdown.Item>
                  </LinkContainer>
                )}

                {/* <NavDropdown.Divider />
                <LinkContainer to='/coaches/login'>
                  <NavDropdown.Item>Coach Login</NavDropdown.Item>
                </LinkContainer> */}
              </NavDropdown>

              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : coachInfo && coachInfo.isAdmin ? (
                <NavDropdown title={coachInfo.name} id='username'>
                  <LinkContainer to='/coaches/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={coachLogoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : coachInfo ? (
                <NavDropdown title={coachInfo.name} id='username'>
                  <LinkContainer to='/coaches/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={coachLogoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
