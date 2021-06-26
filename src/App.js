import './App.css';
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Nav } from './Components'
import { Home, Cart, Splashscreen, Settings, Login, Signup, Wishlist } from './Pages'
import { Protected } from './ProtectedRoute'
import { useAuth, useUser, useRouteTag } from './Context';
import { getToken } from './utils'

import axios from 'axios'

function App() {
  const [splashScreenDisplay, setSplashScreenDisplay] = useState('VISIBLE')
  const { setIsUserLoggedin } = useAuth()
  const { userDispatch, user } = useUser()
  const navigate = useNavigate()
  const { route } = useRouteTag()

  setTimeout(() => {
    setSplashScreenDisplay('HIDDEN')
  }, 3000)


  useEffect(async () => {
    const token = getToken()
    try {
      if (token) {
        const CART_URI = process.env.REACT_APP_CART
        const WISHLIST_URI = process.env.REACT_APP_WISHLIST
        setIsUserLoggedin(true)
        const PRODUCT_URI = process.env.REACT_APP_PRODUCTS
        const PRODUCT = await axios.get(`${PRODUCT_URI}`, { headers: { authorization: token } })
        console.log(PRODUCT)
        const CART = await axios.get(`${CART_URI}`, { headers: { authorization: token } })
        const WISHLIST = await axios.get(`${WISHLIST_URI}`, { headers: { authorization: token } })
        userDispatch({ type: "REFRESH-CART", payload: CART.data.data })
        userDispatch({ type: "REFRESH-WISHLIST", payload: WISHLIST.data.wishlist })
        userDispatch({ type: "REFRESH-PRODUCTS", payload: PRODUCT.data.products })
        userDispatch({ type: "COPY-OF-PRODUCTS", payload: PRODUCT.data.products })
      }
    } catch (e) {
      if (e.response?.status === 401) {
        navigate('/login')
      }
    }

  }, [])

  return (
    <>
      <Nav data={user.products} />
      <Splashscreen display={splashScreenDisplay} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Protected path="/cart" element={<Cart />} />
          <Protected path="/wishlist" element={<Wishlist />} />
          <Protected path="/profile" />
          <Protected path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
