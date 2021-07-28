import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { getToken } from '../utils'

export function Protected({ path, ...props }) {
    const token = getToken()
    return (
        token ? <Route {...props} path={path} /> : <Navigate state={{ from: path }} replace to="/login" />
    )
}

