import React, { useReducer, createContext } from 'react'
import Reducer from 'context/reducers'

export const initialState = {
    my_location: [],
    user_location: [],
}

export const AppContext = createContext(initialState)

export const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState)

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {children}
        </AppContext.Provider>
    )
}