export const signupInitialState = {
    username:"",
    password:"",
    email:"",
    securityQuestion:"",
    answer:""
}

export function SignupReducer(state, action) {
    switch (action.type) {
        case "USERNAME":
            console.log(action.payload)
            return { ...state, username: action.payload }
        case "PASSWORD":
            return { ...state, password: action.payload }
        case "EMAIL":
            return { ...state, email: action.payload }
        case "SECURITY-QUESTION":
            return { ...state, securityQuestion: action.payload }
        case "ANSWER":
            return { ...state, answer: action.payload }
        case "RESET":
            return {username:"",password:"",email:"",securityQuestion:"",answer:""}
        default:
            return state;
    }
}