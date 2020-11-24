import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/coaches/coach/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      coach: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      qty
    }
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = id => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
