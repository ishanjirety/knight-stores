export function CardReducer(state, action) {
    switch (action.type) {
        case "REMOVE-CART":
            return { ...state, total: state.total - state.cart.find(e => e.productId._id === action.payload).productId.sellingPrice, cart: state.cart.filter((item) => item.productId._id !== action.payload) }
        case "REMOVE-WISHLIST":
            return { ...state, wishlist: state.wishlist.filter((item) => item._id !== action.payload._id) }
        case "ADD-WISHLIST":
            return { ...state, wishlist: [...state.wishlist, action.payload] }
        case "ADD-CART":
            return { ...state, cart: [...state.cart, { productId: action.payload }], total: state.total + action.payload.sellingPrice }
        case "WISHLIST-ACTIVE":
            return { ...state, isWishlist: action.payload }
        case "CART-ACTIVE":
            return { ...state, isCart: action.payload }
        case "ADD-PRODUCT":
            return { ...state, products: action.payload.products, userType: action.payload.userType }
        case "REFRESH-PRODUCTS":
            return { ...state, products: action.payload }
        case "REFRESH-CART":
            return { ...state, cart: action.payload }
        case "REFRESH-WISHLIST":
            return { ...state, wishlist: action.payload }
        case "PRICE-RANGE":
            return { ...state, products: state.products.filter((item) => item.sellingPrice < action.payload) }
        case "HIGH-TO-LOW":
            return { ...state, products: state.products.sort((a, b) => b.sellingPrice - a.sellingPrice) }
        case "LOW-TO-HIGH":
            return { ...state, products: state.products.sort((a, b) => a.sellingPrice - b.sellingPrice) }
        case "SEARCH-PRODUCTS":
            return { ...state, products: state.products?.filter((item) => item.name.toLowerCase().includes(action.payload)) }
        case "COPY-OF-PRODUCTS":
            return { ...state, copyProducts: action.payload }
        case "UPDATE-TOTAL":
            return { ...state, total: action.payload }
        default:
            return state;
    }
}
export const CardInitialState = {
    cart: [],
    wishlist: [],
    isWishlist: false,
    isCart: false,
    products: [],
    userType: '',
    copyProducts: [],
    total: 0
}