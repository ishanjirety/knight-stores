export const ProdcutManagememtInitialState = {
    name: "",
    imgUrl: "",
    costPrice: "",
    sellingPrice: "",
    discount: "",
    bestSeller: false,
    sellerName: "",
    rating: ""
}
export function ProductManagementReducer(state, action) {
    switch (action.type) {
        case "PRODUCT-NAME":
            return { ...state, name: action.payload }
        case "IMAGE-URL":
            return { ...state, imgUrl: action.payload }
        case "COST-PRICE":
            return { ...state, costPrice: action.payload }
        case "SELLING-PRICE":
            return { ...state, sellingPrice: action.payload }
        case "DISCOUNT":
            return { ...state, discount: action.payload }
        case "BEST-SELLER":
            return { ...state, bestSeller: action.payload }
        case "SELLER-NAME":
            return { ...state, sellerName: action.payload }
        case "RATING":
            return { ...state, rating: action.payload }
        case "RESET":
            return {
                productName: "",
                imgUrl: "",
                costPrice: "",
                sellingPrice: "",
                discount: "",
                bestSeller: false,
                sellerName: "",
                rating: ""
            }
        default:
            return state
    }
}