import './ProductManagement.css'
import { useReducer, useState } from 'react'
import { ProdcutManagememtInitialState, ProductManagementReducer } from './ProductManagement.reducer'
import { getToken } from '../../utils'
import Loader from '../../Svg/Loader.svg'
import axios from 'axios'
export function ProductManagement() {
    const [ProductManagementState, ProductManagementDispatch] = useReducer(ProductManagementReducer, ProdcutManagememtInitialState)
    const { name,
        imgUrl,
        costPrice,
        sellingPrice,
        discount,
        bestSeller,
        sellerName,
        rating } = ProductManagementState
    const token = getToken()
    const PRODUCT_URI = process.env.REACT_APP_PRODUCTS
    const [isLoader, setLoader] = useState(false)
    async function addProduct() {
        if (name !== "" && imgUrl !== "" && costPrice !== "" && sellingPrice !== "" && discount !== "" && bestSeller !== "" && sellerName !== "" && rating !== "") {
            try {
                setLoader(true)
                const response = await axios.post(`${PRODUCT_URI}/`, ProductManagementState, { headers: { authorization: token } })
                setLoader(false)
                ProductManagementDispatch({type:"RESET"})
            } catch (e) {
                setLoader(false)
            }

        }
    }

    return (
        <div className="product-management">
            <h1 className="heading">Add Products</h1>
            <section className="text-area">
                <div className="input-div">
                    <input type="text" className="input" value={name} onChange={(e) => ProductManagementDispatch({ type: "PRODUCT-NAME", payload: e.target.value })} placeholder="Product name" />
                    <input type="text" className="input" value={imgUrl} onChange={(e) => ProductManagementDispatch({ type: "IMAGE-URL", payload: e.target.value })} placeholder="Image url" />
                </div>
                <div className="input-div">
                    <input type="text" className="input" value={costPrice} onChange={(e) => ProductManagementDispatch({ type: "COST-PRICE", payload: e.target.value })} placeholder="Cost Price" />
                    <input type="text" className="input" value={sellingPrice} onChange={(e) => ProductManagementDispatch({ type: "SELLING-PRICE", payload: e.target.value })} placeholder="Selling Price" />
                </div>
                <div className="input-div">
                    <input type="text" className="input" value={discount} onChange={(e) => ProductManagementDispatch({ type: "DISCOUNT", payload: e.target.value })} placeholder="Discount" />
                    <input type="checkbox" className="input input-checkbox" checked={bestSeller} onChange={(e) => ProductManagementDispatch({ type: "BEST-SELLER", payload: e.target.checked })} /> <label>Bestseller</label>
                </div>
                <div className="input-div">
                    <input type="text" className="input" value={sellerName} onChange={(e) => ProductManagementDispatch({ type: "SELLER-NAME", payload: e.target.value })} placeholder="Seller name" />
                    <input type="text" className="input" value={rating} onChange={(e) => ProductManagementDispatch({ type: "RATING", payload: e.target.value })} placeholder="Rating" />
                </div>
                <div className="btn-div">
                    {!isLoader && <button className="primary-btn" onClick={addProduct}> Save</button>}
                    {isLoader && <button className="primary-btn">Save<div><img src={Loader} alt="" srcset="" /></div></button>}
                    <button className="primary-btn" onClick={() => ProductManagementDispatch({ type: "RESET" })}> Cancel</button>
                </div>
            </section>


        </div>
    );
}
//     name: String,
//     imgUrl:String,

//     costPrice: Number,
//     sellingPrice: Number,

//     discount: Number,
//     bestSeller: Boolean,

//     sellerName: String,

//     rating: String,
//     reviews: Array,