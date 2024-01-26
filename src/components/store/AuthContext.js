import React,{useState} from 'react'


const AuthContext=React.createContext({
    token:[],
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
});

export const AuthProvider=(props)=>{
    const [token,setToken]=useState(null);
    const userIsLoggedIn= !!token;

    const loginHandler=(props)=>{
        setToken(props)

    }

    const logoutHandler=()=>{
        setToken(null);
    }

    const contextValue={
        token:token,
        isLoggedIn:userIsLoggedIn,
        logout:logoutHandler,
        login:loginHandler
    }

    return(<AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>)
}

export default AuthContext;