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
export function Cart() {
    const { setRoute } = useRouteTag()
    setRoute("Cart")
    const CART_URI = process.env.REACT_APP_CART
    const { userDispatch, user } = useUser()
    console.log(user)
    const navigate = useNavigate()
    useEffect(async () => {
        const token = getToken()
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

    // useEffect(()=>{
    //     user.cart.forEach((item) => setTotal((total) => total + item.productId.sellingPrice))
    // },[user])


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
                    <button className="primary-btn">Proceed to pay</button>
                </div>
            </div>
        </div>
    )
}
