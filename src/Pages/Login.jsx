import React, { useReducer, useState, useEffect } from 'react'
import './Styles.css'
import Logo from '../Svg/Logo.svg'
import LogoLight from '../Svg/Logo-light.svg'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { signupInitialState, SignupReducer } from './Reducers'
import { useAuth, useUser, useRouteTag } from '../Context'

import axios from 'axios'
import Loader from '../Svg/Loader.svg'
import { setToken, getToken } from '../utils'
export function Login() {
    const [signupState, signupDispatch] = useReducer(SignupReducer, signupInitialState)
    const { state } = useLocation();
    const { setIsUserLoggedin } = useAuth()
    const { userDispatch } = useUser()
    const { setRoute } = useRouteTag()
    const [isLoader, setLoader] = useState(false)
    const navigate = useNavigate()
    setRoute("Login")
    async function Login() {
        const { username, password } = signupState

        if (username !== "" && password !== "") {
            const LOGIN_URI = process.env.REACT_APP_AUTH
            try {
                setLoader(true)
                const { data } = await axios.post(`${LOGIN_URI}/login`, { username: username, password: password })
                console.log(data.data.token)
                if (data.success) {
                    signupDispatch({ type: "RESET" })
                    setLoader(false)
                    setIsUserLoggedin(true)
                    setToken(data.data.token)
                    userDispatch({ type: "REFRESH-WISHLISt", payload: data.data.wishlist })
                    userDispatch({ type: "REFRESH-CART", payload: data.data.cart })
                    userDispatch({ type: "ADD-PRODCUTS", payload: { products: [], userType: data.data.userType } })
                    navigate(state?.from ? state.from : "/")
                }
            } catch (e) {
                console.log(e.message)
                setLoader(false)
            }
        }
    }
    useEffect(() => {
        const token = getToken()
        if (!token) {
            navigate('/login')
        }
    }, [])

    return (
        <div className="page login">
            <div className="header-wrapper" style={{ paddingBottom: "0.6rem" }} >
                <p className="heading"><img src={Logo} className="logo" alt="" /><img src={LogoLight} className="logo-light" alt="" />KnightStores</p>
            </div>
            <div className="login-wrapper">
                <div className="login-title">
                    <h2 className="login-heading">Login</h2>
                    <div className="underline"> </div>
                </div>
                <div className="login-input">
                    <input className="input" placeholder="Username" value={signupState.username} onChange={(e) => signupDispatch({ type: "USERNAME", payload: e.target.value })} />
                    <input className="input" type="password" placeholder="Password" value={signupState.password} onChange={(e) => signupDispatch({ type: "PASSWORD", payload: e.target.value })} />
                </div>
                {!isLoader && <button className="primary-btn" onClick={Login}>Login</button>}
                {isLoader && <button className="primary-btn">Login<div><img src={Loader} alt="" srcset="" /></div></button>}
                <Link to='/signup' className="link">Not registered yet? Register →</Link>
            </div>
        </div>
    )
}


