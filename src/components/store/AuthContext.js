import React,{useEffect, useState} from 'react'


const AuthContext=React.createContext({
    token:[],
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
});

export const AuthProvider=(props)=>{
    const intitalToken=localStorage.getItem('token')
    const [token,setToken]=useState(intitalToken);
    const userIsLoggedIn= !!token;

    const loginHandler=(props)=>{

        setToken(props);
        localStorage.setItem('token',token);


    }

    const logoutHandler=()=>{
        setToken(null);
        localStorage.removeItem('token');
    }


    useEffect(()=>{
        const logoutTimer=setTimeout(()=>{
            logoutHandler();
        },5*60*1000);
        return()=>{
            clearTimeout(logoutTimer);
        };
    },[token])
    const contextValue={
        token:token,
        isLoggedIn:userIsLoggedIn,
        logout:logoutHandler,
        login:loginHandler
    }

    return(<AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>)
}

export default AuthContext;