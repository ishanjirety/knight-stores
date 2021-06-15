
import React from 'react'
import Loader from '../Svg/Loader.svg'
export function Splashscreen({display}) {
    return (
        <div className={display === "VISIBLE" ? "splash-screen" : "hidden"}>
            <div className="circle top"></div>
            <div className="circle bottom"></div>
            <h1>KnightStores</h1>
            <p>One stop for your tactical shopping experience</p>
            <img src={Loader} alt="" srcset="" />
        </div>
    )
}



