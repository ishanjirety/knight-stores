import React, { useContext, createContext, useState } from 'react'

const RouteContext = createContext()

export function RouteTag({ children }) {
    const [route, setRoute] = useState("")
    return (
        <RouteContext.Provider value={{ route, setRoute }}>
            {children}
        </RouteContext.Provider>
    )
}

export function useRouteTag() {
    return useContext(RouteContext)
}

