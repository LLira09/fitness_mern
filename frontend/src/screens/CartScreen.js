import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  const coachId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (coachId) {
      dispatch(addToCart(coachId, qty))
    }
  }, [dispatch, coachId, qty])

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }
  return (
    <Row>
      <Col md={8}>
        <h3>Training Package</h3>
        {cartItems.length === 0 ? (
          <Message variant='secondary'>
            Choose a trainer to work with{' '}
            <Link to='/coaches'> Find a Trainer</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.coach}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <Link to={`/coaches/coach/${item.coach}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price} / per month</Col>
                  <Col md={3}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={e =>
                        dispatch(addToCart(item.coach, Number(e.target.value)))
                      }
                    >
                      <option value={1}>1 Month</option>
                      <option value={3}>3 Months</option>
                      <option value={6}>6 Months</option>
                      <option value={12}>12 Months</option>
                    </Form.Control>{' '}
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.coach)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, months) => acc + months.qty, 0)}) months
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
