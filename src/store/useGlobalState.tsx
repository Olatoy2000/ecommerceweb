import React, { useState, createContext, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

type StateContextType = {
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider= ({ children }:{children: React.ReactNode}) => {

  const value = Cookies.get('localState') || {} as any;
const [state, setState] = useState();


useEffect(()=> {
  try {
    const parseValue = JSON.parse(value);
    setState(parseValue);
  } catch (error) {
    setState({} as any)
  }
}, [])
  

  

  // useEffect (() => {
  //   if (typeof window !== "undefined") {
  //     // Code that uses localStorage can go here
  //     let localState = localStorage.getItem("localState") || {} as any;
  //     // const isAdmin = JSON.parse(localState).isAdmin
  //     setState(localState)
  //   }
  // }, [])
  console.log(typeof value);


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
