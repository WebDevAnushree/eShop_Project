export const initialState = {
  basket: [],
  user: null,

};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => amount + item.price * item.qty, 0);

export const getBasketCount = (basket) =>
  basket?.reduce((count, item) => count + item.qty, 0);

const reducer = (state, action) => {
  switch (action.type) {

    case "ADD_TO_BASKET": {
      const existing = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (existing) {
        return {
          ...state,
          basket: state.basket.map((item) =>
            item.id === action.item.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        basket: [...state.basket, { ...action.item, qty: 1 }],
      };
    }


    case "INCREASE_QTY":
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.id
            ? { ...item, qty: item.qty + 1 }
            : item
        ),
      };

    // ---------------- DECREASE ----------------
    case "DECREASE_QTY":
      return {
        ...state,
        basket: state.basket
          .map((item) =>
            item.id === action.id
              ? { ...item, qty: item.qty - 1 }
              : item
          )
          .filter((item) => item.qty > 0),
      };

    // ---------------- REMOVE FULL ITEM ----------------
    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        basket: state.basket.filter(
          (item) => item.id !== action.id
        ),
      };

    // ---------------- EMPTY ----------------
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

      
    // ---------------- USER ----------------
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;