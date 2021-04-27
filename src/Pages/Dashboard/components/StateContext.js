import React, { useState, useContext } from "react";

export const StateContext = React.createContext();

export const useTaskState = () => {
  return useContext(StateContext);
};

export const StateContextProvider = ({ children }) => {
  const [state, setState] = useState({
    todoItems: [],
    doneItems: [],
    onholdItems: [],
  });

  const updateState = (newState) => {
    return setState({
      ...state,
      ...newState,
    });
  };

  return (
    <StateContext.Provider value={[state, updateState]}>
      {children}
    </StateContext.Provider>
  );
};
