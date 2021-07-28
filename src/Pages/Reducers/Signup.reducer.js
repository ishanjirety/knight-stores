export const signupInitialState = {
    username:"admin",
    password:"admin",
    email:"",
    securityQuestion:"",
    answer:""
}

export function SignupReducer(state, action) {
    switch (action.type) {
        case "USERNAME":
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