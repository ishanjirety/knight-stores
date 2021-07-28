import React, { createContext, useContext, useState, useReducer } from 'react'
import { CardReducer,CardInitialState } from '../Components/Card/Card.reducer'

const UserContext = createContext()
export function User({ children }) {
    const [user, userDispatch] = useReducer(CardReducer,CardInitialState)
    return (
        <UserContext.Provider value={{ user, userDispatch }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext)
}

