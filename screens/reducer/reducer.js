const initialState = {
  cart: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === 'add_cart') {
    return {
      ...state,
      cart: action.payload,
    };
  }

  return state;
};

export default reducer;
