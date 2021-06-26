import React, { useState, useEffect } from 'react'
import './Styles.css'
import './Responsive.css'
import '../Components/Filter/Filter.css'
import Logo from '../Svg/Logo.svg'
import LogoLight from '../Svg/Logo-light.svg'
import { Filter } from '../Svg'
import { FilterCard, Card } from '../Components'
import { useRouteTag, useUser } from '../Context'
import { getToken } from '../utils'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Svg/Loader.svg'

export function Home() {
    const [toggle, setToggle] = useState(false)

    const { setRoute } = useRouteTag()
    const { user, userDispatch } = useUser()
    const [product,setProduct] = useState([])
    const [slider,setSlider] = useState(5000)
    const [highToLow, setHighToLow] = useState(false)
    const [lowToHigh, setLowToHigh] = useState(false)
    const navigate = useNavigate()
    setRoute("Home")

    useEffect(async () => {

        const token = getToken()
        try {
            const PRODUCT_URI = process.env.REACT_APP_PRODUCTS
            if (token) {
                const { data } = await axios.get(`${PRODUCT_URI}`, { headers: { authorization: token } })
                userDispatch({ type: "ADD-PRODUCT", payload: { products: data.products, userType: data.userType } })
                setProduct(data.products)
            } else {
                const { data } = await axios.get(`${PRODUCT_URI}`)
                userDispatch({ type: "ADD-PRODUCT", payload: { products: data.products, userType: "user" } })
                setProduct(data.products)
            }
        } catch (e) {
            if (e.response?.status === 500) {
                navigate('/login')
            }
        }

    }, [])

    function handleSlider(e){
        userDispatch({type:"REFRESH-PRODUCTS",payload:product})
        setSlider(parseInt(e.target.value,10))
        console.log(parseInt(e.target.value,10))
        userDispatch({type:"PRICE-RANGE",payload:slider})
    }
    return (

        <div className="page">

            <div className="header-wrapper">
                <p className="heading"><img src={Logo} className="logo" alt="" onClick={()=>navigate('/')} /><img src={LogoLight} className="logo-light" alt="" />KnightStores</p>
                <span onClick={() => setToggle(!toggle)}><Filter /></span>
            </div>
            <FilterCard expand={toggle} setter={setToggle} data={product} />
            <div className="wrapper">

                <div className="filter-area">
                    <p>Price filter</p>
                    <div className="filter-action">
                        <input type="radio" id="check" class="check" checked={highToLow} onChange={()=>userDispatch({type:"HIGH-TO-LOW"})} onClick ={()=>{
                            setHighToLow(true)
                            setLowToHigh(false)
                        }}/>
                        <p className="checkbox-tag">High to low</p>
                    </div>
                    <div className="filter-action">
                        <input type="radio" id="check" class="check" checked={lowToHigh} onChange={()=>userDispatch({type:"LOW-TO-HIGH"})} onClick ={()=>{
                            setHighToLow(false)
                            setLowToHigh(true)
                        }}/>
                        <p className="checkbox-tag">Low to High</p>
                    </div>
                    <div class="range-slider">
                        <input class="range-slider-range" type="range" min="500" max="10000" step={1} value={slider} onChange={(e)=>handleSlider(e)} onClick={(e)=>handleSlider(e)}/>
                        <span class="range-slider-value">{slider}</span>
                    </div>
                </div>

                {user?.products ? <div className="card-wrapper">
                    {user.products.map((items) => {

                        if (user.cart?.length > 0 || user.wishlist?.length > 0) {
                            if (user.cart.find((cartItem) => (items._id)?.toString() === (cartItem.productId._id)?.toString())) {
                                if (user.wishlist.find((wishlistItem) => (items._id)?.toString() === (wishlistItem._id)?.toString())) {
                                    return <Card data={items} wishlistStatus={true} cartStatus={true} />
                                } else {
                                    return <Card data={items} wishlistStatus={false} cartStatus={true} />
                                }
                            } else if (user.wishlist.find((wishlistItem) => (items._id)?.toString() === (wishlistItem._id)?.toString())) {
                                return <Card data={items} wishlistStatus={true} cartStatus={false} />
                            }
                        }
                        return <Card data={items} wishlistStatus={false} cartStatus={false} />
                    })}
                </div> : <img className="loader" src={Loader} />}
            </div>
        </div>
    )
}



