import "./Filter.css";
import { Down } from '../../Svg'
import { useUser } from '../../Context'
import { useState, useEffect } from "react";
export function FilterCard({ data, expand, setter }) {
    const { userDispatch, user } = useUser()
    const [slider, setSlider] = useState(5000)
    const [product, setProduct] = useState()
    const [highToLow, setHighToLow] = useState(false)
    const [lowToHigh, setLowToHigh] = useState(false)

    function handleSlider(e) {
        userDispatch({ type: "REFRESH-PRODUCTS", payload: data })
        setSlider(parseInt(e.target.value, 10))
        userDispatch({ type: "PRICE-RANGE", payload: slider })
    }
    useEffect(() => {
        setProduct(data)
    },[])
    return (
        <div className={expand ? "filter-wrapper visible" : "filter-wrapper"} >
            <div className={expand ? "filter expand" : "filter"}>
                <div className="header-wrapper">
                    <p className="heading">Filters</p>
                    <span onClick={() => setter(false)}><Down /></span>
                </div>
                <div className="options">
                    <p>Price filter</p>
                    <div className="filter-action">
                        <input type="radio" id="check" class="check" checked={highToLow} onChange={() => userDispatch({ type: "HIGH-TO-LOW" })} onClick={() => {
                            setHighToLow(true)
                            setLowToHigh(false)
                        }
                        } />
                        <p className="checkbox-tag">High to low</p>
                    </div>
                    <div className="filter-action">
                        <input type="radio" id="check" class="check" checked={lowToHigh} onChange={() => userDispatch({ type: "LOW-TO-HIGH" })} onClick={() => {
                            setLowToHigh(true)
                            setHighToLow(false)
                            }} />
                        <p className="checkbox-tag"> Low to High</p>
                    </div>
                    <p>Price Range</p>

                    <div class="range-slider">
                        <input class="range-slider-range" type="range" min="500" max="10000" step={1} value={slider} onChange={(e) => handleSlider(e)} onClick={(e) => handleSlider(e)} />
                        <span class="range-slider-value">{slider}</span>
                    </div>
                </div>
            </div>
        </div>
    );
    // onClick={() => setter(false)}
}