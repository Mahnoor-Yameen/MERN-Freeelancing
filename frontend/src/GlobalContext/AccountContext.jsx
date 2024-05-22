import React, { useEffect, useReducer, useState } from 'react'
import { createContext } from "react";
import { AccountReducer } from './AccountReducer';
import Cookies from 'js-cookie';
export const AccountContextVariable = createContext("initial value")


export default function AccountContext({children}) {




const InitialLoginData={
    token: Cookies.get('token') || undefined  ,//shru main ya to undefined hoga ya to jo cookiies se milega
    people :Cookies.get('people') || 'guest',
    Email :Cookies.get('Email') || undefined

}


    const [account_state,account_dispatch] = useReducer(AccountReducer, InitialLoginData)


    



    // applying useEffect for 
    // jab login state ka token change hoga tab tab yeh use Effect chalega
// jo hamari web main token change hua hoga wo token hum set krwa rahy in cookies
    useEffect(()=>{
        Cookies.set('token', account_state.token)
        Cookies.set('people', account_state.people)
        Cookies.set('Email', account_state.Email)


    },[account_state.token])


  return (
    <>
    <AccountContextVariable.Provider value={{account_state, account_dispatch}}>
        {children}
    </AccountContextVariable.Provider>
    
    </>
  )
}
