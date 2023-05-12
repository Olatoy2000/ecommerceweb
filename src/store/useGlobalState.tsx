import React, { useState, createContext, useContext } from 'react';

type StateContextType = {
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider= ({ children }:{children: React.ReactNode}) => {
  const [state, setState] = useState({});

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = (): StateContextType => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateValue must be used within a StateProvider');
  }
  return context;
};
