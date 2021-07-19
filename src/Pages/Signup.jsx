import React, { useReducer, useState } from 'react'
import './Styles.css'
import Logo from '../Svg/Logo.svg'
import LogoLight from '../Svg/Logo-light.svg'
import { Link, useNavigate } from 'react-router-dom'
import { signupInitialState, SignupReducer } from './Reducers'
import Loader from '../Svg/Loader.svg'
import axios from 'axios'

export function Signup() {
    const [signupState, signupDispatch] = useReducer(SignupReducer, signupInitialState)
    const [isLoader, setLoader] = useState(false)
    const SIGNUP_URI = process.env.REACT_APP_AUTH
    const navigate = useNavigate()
    async function userSignup() {
        const { username, password, email, securityQuestion, answer } = signupState
        if (username !== "" && password !== "" && email !== "" && securityQuestion !== "" && answer !== "") {
            try {
                setLoader(true)
                const { data: { success } } = await axios.post(`${SIGNUP_URI}/signup`, { ...signupState, userType: "user" })
                if (success) {
                    signupDispatch({ type: "RESET" })
                    setLoader(false)
                    navigate('/login')
                }
            } catch (e) {
                console.log(e.message)
            }
        }
    }

    return (
        <div className="page login">
            <div className="header-wrapper" style={{ paddingBottom: "0.6rem" }} >
                <p className="heading"><img src={Logo} className="logo" alt="" /><img src={LogoLight} className="logo-light" alt="" />KnightStores</p>
            </div>
            <div className="login-wrapper">
                <div className="login-title">
                    <h2 className="login-heading">Signup</h2>
                    <div className="underline"> </div>
                </div>
                <div className="login-input">
                    <input className="input" placeholder="Username" value={signupState.username} onChange={(e) => signupDispatch({ type: "USERNAME", payload: e.target.value })} />
                    <input className="input" type="password" placeholder="Password" value={signupState.password} onChange={(e) => signupDispatch({ type: "PASSWORD", payload: e.target.value })} />
                    <input className="input" placeholder="Email" value={signupState.email} onChange={(e) => signupDispatch({ type: "EMAIL", payload: e.target.value })} />
                    <input className="input" placeholder="Security Question" value={signupState.securityQuestion} onChange={(e) => signupDispatch({ type: "SECURITY-QUESTION", payload: e.target.value })} />
                    <input className="input" placeholder="Answer" value={signupState.answer} onChange={(e) => signupDispatch({ type: "ANSWER", payload: e.target.value })} />
                </div>
                {!isLoader && <button className="primary-btn" onClick={userSignup}>Signup</button>}
                {isLoader && <button className="primary-btn">Signup<div><img src={Loader} alt="" srcset="" /></div></button>}
                <Link to='/login' className="link">Alredy registered? Sign in →</Link>
            </div>
        </div>
    )
}


