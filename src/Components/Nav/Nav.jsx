import "./Nav.css";
import "./Responsive.css"
import { NavLink } from 'react-router-dom'
import { Wishlist, Home, Cart, Profile, Search, Settings } from '../../Svg'
import { useRouteTag, useUser } from '../../Context'
import { useState, useEffect } from 'react'
export function Nav({ data }) {
      const { setRoute, route } = useRouteTag()
      const { user, userDispatch } = useUser()
      const [query, setQuery] = useState()
      const [timeOutRef, setTimeOutRef] = useState(1)

      // Debounce
      useEffect(() => {
            console.log(user.copyProducts)
            clearTimeout(timeOutRef)
            if(query !== ""){
                  const ref = setTimeout(() => {
                        userDispatch({ type: "REFRESH-PRODUCTS", payload: user.copyProducts })
                        userDispatch({ type: "SEARCH-PRODUCTS", payload: query })
                  }, 1000)
                  setTimeOutRef(ref)
            }
            if(query === ""){
                  userDispatch({ type: "REFRESH-PRODUCTS", payload: user.copyProducts })
            }
      }, [query])
      
      useEffect(() => {
            userDispatch({ type: "COPY-OF-PRODUCTS", payload: user.products })
            console.log(user)
      }, [user.copyProduct])

      return (
            <nav className="nav">
                  <NavLink to="/" className={route === "Home" ? "nav-link focus home" : "nav-link home"} onClick={() => setRoute('Home')}>
                        <Home />
                        {route === 'Home' && <span></span>}
                  </NavLink>
                  <NavLink to="/" className={route === "Search" ? "nav-link focus desktop" : "nav-link desktop"} onClick={() => setRoute('Search')}>
                        <div className="search-wrapper">
                              <input type="text" placeholder="Search here..." className="search-bar" onChange={(e) => setQuery(e.target.value.toLowerCase())} />
                              <div><Search /></div>
                        </div>
                        {route === 'Search' && <span></span>}
                  </NavLink>
                  <NavLink to="/search" className={route === "Search" ? "nav-link margin-bottom focus mobile" : "nav-link margin-bottom mobile"} onClick={() => setRoute('Search')} >
                        <Search />
                        {route === 'Search' && <span></span>}
                  </NavLink>

                  <NavLink to="/cart" className={route === "Cart" ? "nav-link margin-bottom focus" : "nav-link margin-bottom"} onClick={() => setRoute('Cart')} >
                        <Cart />
                        {route === 'Cart' && <span></span>}
                  </NavLink>
                  <NavLink to="/wishlist" className={route === "Wishlist" ? "nav-link focus" : "nav-link"} onClick={() => setRoute('Wishlist')} >
                        <Wishlist />
                        {route === 'Wishlist' && <span></span>}
                  </NavLink>
                  <NavLink to="/profile" className={route === "Profile" ? "nav-link focus" : "nav-link"} onClick={() => setRoute('Profile')} >
                        <Profile />
                        {route === 'Profile' && <span></span>}
                  </NavLink>
                  {user?.userType === "admin" && <NavLink to="/settings" className={route === "Settings" ? "nav-link focus" : "nav-link"} onClick={() => setRoute('Settings')} >
                        <Settings />
                        {route === 'Settings' && <span></span>}
                  </NavLink>}
            </nav>
      );
}