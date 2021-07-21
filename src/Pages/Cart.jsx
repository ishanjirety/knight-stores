import React, { useEffect, useState } from 'react'
import { useRouteTag } from '../Context'
import { Card } from '../Components'
import Logo from '../Svg/Logo.svg'
import LogoLight from '../Svg/Logo-light.svg'
import axios from 'axios'
import { getToken } from '../utils'
import { useUser } from '../Context'
import EmptyCart from '../Svg/Empty-cart.svg'
import { useNavigate } from 'react-router-dom'

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}


export function Cart() {


    
    const { setRoute } = useRouteTag()
    const CART_URI = process.env.REACT_APP_CART
    const { userDispatch, user } = useUser()
    const [loading,setLoading] = useState('Proceed to pay')
    const token = getToken()
    const navigate = useNavigate()


    async function displayRazorpay(total) {
        setLoading('Processing...')
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }

        const { data } = await axios.post('https://knight-storesAPI.ishanjirety.repl.co/api/razorpay', {
            amount: total
        })

        console.log(data)

        const options = {
            key: process.env.REACT_APP_RZP_KEY_ID,
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            name: 'KnightStores',
            description: 'Thank you for your purchase',
            image: 'http://localhost:3000/Logo.svg',
            handler: async function () {
                const response = await axios.delete(`${CART_URI}/all`, {
                    headers: { authorization: token },
                })
                userDispatch({ type: "CLEAR-CART" })
            },
        }

        const paymentObject = new window.Razorpay(options)
        setLoading('Proceed to pay')
        paymentObject.open()
    }




    
    useEffect(async () => {
        setRoute("Cart")
        try {
            const CART_URI = process.env.REACT_APP_CART
            const WISHLIST_URI = process.env.REACT_APP_WISHLIST
            if (token) {
                let total = 0
                const { data } = await axios.get(`${CART_URI}`, { headers: { authorization: token } })
                data.data.forEach((item) => {
                    return total = total + item.productId.sellingPrice
                })
                const wishlistResponse = await axios.get(`${WISHLIST_URI}`, { headers: { authorization: token } })

                userDispatch({ type: "UPDATE-TOTAL", payload: total })
                userDispatch({ type: "REFRESH-WISHLIST", payload: wishlistResponse.data.wishlist })
                userDispatch({ type: "REFRESH-CART", payload: data.data })
            }
        } catch (e) {
            console.log(e.message)
            navigate('/login')
        }
    }, [])


    return (
        <div className="page">
            <div className="header-wrapper" style={{ paddingBottom: "0.6rem" }} onClick={() => navigate('/')} >
                <p className="heading"><img src={Logo} className="logo" alt="" /><img src={LogoLight} className="logo-light" alt="" />KnightStores</p>
            </div>
            <div className="cart-wrapper">
                {user?.cart?.length > 0 ? <div className="card-wrapper cart">
                    {console.log(user.cart)}
                    {
                        user.cart.map((item) => {
                            if (user.wishlist.find((wishlistItem) => (wishlistItem?._id)?.toString() === (item.productId._id)?.toString())) {
                                console.log("here")
                                return <Card data={item.productId} wishlistStatus={true} />
                            }
                            return <Card data={item.productId} />
                        })
                    }
                </div> : <div className="banner-wrapper"><img src={EmptyCart} className="banner" alt="" /><h1>Your cart is empty...</h1></div>}
                <div className="total-area">
                    <h1>Total</h1>
                    <div className="details">
                        <p><strong>Total Items</strong> <p>{user?.cart?.length}</p></p>
                        <p><strong>Total Discount</strong> <p>0</p></p>
                        <div></div>
                        <h3><strong>Grand Total</strong> <p>{user.total}</p></h3>
                    </div>
                    <button disabled={user.total > 0 ? false : true } className="primary-btn" onClick={() => displayRazorpay(user.total)}>{loading}</button>
                </div>
            </div>
        </div>
    )
}



