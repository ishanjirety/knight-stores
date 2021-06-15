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
export function Wishlist() {
    const { setRoute } = useRouteTag()
    setRoute("Wishlist")
    const { userDispatch, user } = useUser()
    const navigate = useNavigate()
    useEffect(async () => {
        const token = getToken()
        try {
            const CART_URI = process.env.REACT_APP_CART
            const WISHLIST_URI = process.env.REACT_APP_WISHLIST
            if (token) {
                const { data } = await axios.get(`${CART_URI}`, { headers: { authorization: token } })
                const wishlistResponse = await axios.get(`${WISHLIST_URI}`, { headers: { authorization: token } })
                console.log(wishlistResponse.data.wishlist)
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
                {user?.wishlist?.length > 0 ? <div className="card-wrapper cart">
                    {console.log(user.cart)}
                    {
                        user.wishlist.map((item) => {
                            if (user.cart.find((cartItem) => (cartItem?.productId?._id).toString() === (item._id).toString())) {
                                return <Card data={item} wishlistStatus={true} cartStatus={false} />
                            }
                            return <Card data={item} wishlistStatus={true}/>
                        })
                    }
                </div> : <div className="banner-wrapper"><img src={EmptyCart} className="banner" alt="" /><h1>Your cart is empty...</h1></div>}
            </div>
        </div>
    )
}
