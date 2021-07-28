import { signupInitialState, SignupReducer } from '../Reducers'

describe("Testing signup reducer", () => {
    it("Testing Username", () => {
        const state = SignupReducer(signupInitialState,{type:"USERNAME",payload:"ishan"})
        expect(state).toEqual({
            username:"ishan",
            password:"",
            email:"",
            securityQuestion:"",
            answer:""
        })
    })
    it("Testing Password", () => {
        const state = SignupReducer(signupInitialState,{type:"PASSWORD",payload:"1234"})
        expect(state).toEqual({
            username:"",
            password:"1234",
            email:"",
            securityQuestion:"",
            answer:""
        })
    })
    it("Testing Password", () => {
        const state = SignupReducer(signupInitialState,{type:"EMAIL",payload:"ishan@123.com"})
        expect(state).toEqual({
            username:"",
            password:"",
            email:"ishan@123.com",
            securityQuestion:"",
            answer:""
        })
    })
    it("Testing Security Question", () => {
        const state = SignupReducer(signupInitialState,{type:"SECURITY-QUESTION",payload:"Test question"})
        expect(state).toEqual({
            username:"",
            password:"",
            email:"",
            securityQuestion:"Test question",
            answer:""
        })
    })
    it("Testing Answer", () => {
        const state = SignupReducer(signupInitialState,{type:"ANSWER",payload:"Test"})
        expect(state).toEqual({
            username:"",
            password:"",
            email:"",
            securityQuestion:"",
            answer:"Test"
        })
    })
})
