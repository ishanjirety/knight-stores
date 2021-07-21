import "./Card.css";
import "./Responsive.css"
import { useState, useReducer, useEffect } from 'react'
import { Wishlist, WishlistFilled } from '../../Svg'
import { useRouteTag, useUser } from '../../Context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../Svg/Loader.svg'
import { getToken } from '../../utils'
import { CardReducer } from './Card.reducer'


export function Card({ data, wishlistStatus, cartStatus }) {
    const { route } = useRouteTag()
    const navigate = useNavigate()
    const { name, costPrice, discount, imgUrl, rating, sellerName, sellingPrice, _id } = data
    const token = getToken()
    const CART_URI = process.env.REACT_APP_CART
    const WISHLIST_URI = process.env.REACT_APP_WISHLIST
    const [isLoader, setLoader] = useState(false)
    const [isWishlist, setWishlist] = useState(false)
    const [isCart, setCart] = useState(false)
    const { user, userDispatch } = useUser()
    // const [CardState, userDispatch] = useReducer(CardReducer, {
    //     cart: [],
    //     wishlist: [],
    //     isWishlist: false,
    //     isCart: false
    // })

    async function AddtoCart() {
        try {
            setLoader(true)
            const response = await axios.post(`${CART_URI}`, { _id: _id }, { headers: { authorization: token } })
            userDispatch({ type: "ADD-CART", payload: data })
            setCart(true)
            setLoader(false)
        } catch (e) {
            setLoader(false)
        }
    }

    useEffect(() => {
        setWishlist(() => wishlistStatus)
    }, [wishlistStatus])

    async function AddToWishlist() {
        try {
            if (!isWishlist) {
                const response = await axios.post(`${WISHLIST_URI}`, { _id: _id }, { headers: { authorization: token } })
                userDispatch({ type: "ADD-WISHLIST", payload: data })
                setWishlist(true)
            } else {
                setLoader(true)
                const response = await axios.delete(`${WISHLIST_URI}`, {
                    headers: {
                        'Authorization': token
                    },
                    data: { _id: _id }
                })
                userDispatch({ type: "REMOVE-WISHLIST", payload: data })
                setWishlist(false)
                setLoader(false)
            }

        } catch (e) {
            setLoader(false)
        }
    }

    async function RemoveFromCart() {

        try {
            setLoader(true)
            const response = await axios.delete(`${CART_URI}`, {
                headers: { authorization: token },
                data: { _id: _id }
            })
            userDispatch({ type: "REMOVE-CART", payload: _id.toString() })
            setLoader(false)
        }
        catch (e) {
            setLoader(false)
        }
    }
    return (
        <div className="card">
            <div className="wishlist-btn" onClick={AddToWishlist}>
                {(!isWishlist ? <Wishlist /> :
                    <WishlistFilled />)}
            </div>
            <img src={imgUrl} className="hero" alt="" />
            <p className="card-heading">{name}</p>
            <div className="pricing">
                <p className="selling-price">₹ {sellingPrice}</p>
                <small className="strike-through">₹ {costPrice}</small>
            </div>
            {route !== "Cart" && !isLoader && !cartStatus && !isCart && <button className="primary-btn" onClick={AddtoCart}>Add To Cart</button>}
            {isLoader && <button className="primary-btn">Add To Cart<div><img src={Loader} alt="" srcset="" /></div></button>}
            {route === "Cart" && !isLoader && <button className="primary-btn" onClick={RemoveFromCart}>Remove</button>}
            {cartStatus ? <button className="primary-btn" onClick={() => navigate('/cart')}>Go to cart</button> : isCart && <button className="primary-btn" onClick={() => navigate('/cart')}>Go to cart</button>}
        </div>
    );
}
