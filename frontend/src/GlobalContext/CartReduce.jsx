
export const CartReducer = (cart_state, action) => {
  switch (action.type) {


    case "ADD_TO_CART":
      return { ...cart_state, cart: [...cart_state.cart, action.payload] }
    case "CLEAR_CART":
      return { ...cart_state, cart: [] }

    case "UPDATE_CART":
      return {
        ...cart_state,
        cart: action.payload
      };


    case "DELETE_PRODUCT":
    return {
      ...cart_state,
      cart: cart_state.cart.filter(cart => cart._id !== action.ProductID)
    };


    default:
      return cart_state;
  }


}