export const initialState = {
    user: null,
};

export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {
            ...state,
            user: action.user,
        }
        default:
            return state;
    }
}
export default reducer;