import React, { createContext, useContext, useEffect, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {

  const persistedState = localStorage.getItem("eshop_state");

  const [state, dispatch] = useReducer(
    reducer,
    persistedState ? JSON.parse(persistedState) : initialState
  );

  useEffect(() => {
    localStorage.setItem("eshop_state", JSON.stringify(state));
  }, [state]);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
