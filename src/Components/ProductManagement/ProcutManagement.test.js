import {ProdcutManagememtInitialState,ProductManagementReducer} from './ProductManagement.reducer'

describe("Testing ProductManagement",()=>{
    it("Testing Product Name",()=>{
        const state = ProductManagementReducer(ProdcutManagememtInitialState,{type:"PRODUCT-NAME",payload:"abcd"})
        expect(state).toEqual({...ProdcutManagememtInitialState,name:"abcd"})
    })
    it("Testing Image Url",()=>{
        const state = ProductManagementReducer(ProdcutManagememtInitialState,{type:"IMAGE-URL",payload:"https://abcd.com"})
        expect(state).toEqual({...ProdcutManagememtInitialState,imgUrl:"https://abcd.com"})
    })
    it("Testing Cost Price",()=>{
        const state = ProductManagementReducer(ProdcutManagememtInitialState,{type:"COST-PRICE",payload:2000})
        expect(state).toEqual({...ProdcutManagememtInitialState,costPrice:2000})
    })
    it("Testing Selling Price",()=>{
        const state = ProductManagementReducer(ProdcutManagememtInitialState,{type:"SELLING-PRICE",payload:2000})
        expect(state).toEqual({...ProdcutManagememtInitialState,sellingPrice:2000})
    })
    it("Testing Discount",()=>{
        const state = ProductManagementReducer(ProdcutManagememtInitialState,{type:"DISCOUNT",payload:"20%"})
        expect(state).toEqual({...ProdcutManagememtInitialState,discount:"20%"})
    })
    it("Testing Best seller",()=>{
        const state = ProductManagementReducer(ProdcutManagememtInitialState,{type:"BEST-SELLER",payload:false})
        expect(state).toEqual({...ProdcutManagememtInitialState,bestSeller:false})
    })
    it("Testing Best seller",()=>{
        const state = ProductManagementReducer(ProdcutManagememtInitialState,{type:"SELLER-NAME",payload:"xyz traders"})
        expect(state).toEqual({...ProdcutManagememtInitialState,sellerName:"xyz traders"})
    })
    it("Testing Rating",()=>{
        const state = ProductManagementReducer(ProdcutManagememtInitialState,{type:"RATING",payload:"4.6"})
        expect(state).toEqual({...ProdcutManagememtInitialState,rating:"4.6"})
    })
})