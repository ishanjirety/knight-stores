import React,{useState,createContext,useContext} from 'react'

const AuthContext = createContext()

export function AuthProvider({children}) {
    const [isUserLoggedIn,setIsUserLoggedin] = useState(false)
    return (
        <AuthContext.Provider value={{isUserLoggedIn,setIsUserLoggedin}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}
