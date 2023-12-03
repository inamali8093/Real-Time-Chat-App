import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children,authentication=true}) => {
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    //console.log("authStatus:",authStatus);

    useEffect(()=>{
      //   if(authStatus===true){
      //           navigate('/')
      //        } else if(authStatus===false){
      //           navigate('/login')
      //        }
      if(authentication && authStatus !== authentication){
         // true && false !== true => true
         navigate('/login')
     } else if(!authentication && authStatus !== authentication){
         // false && true !== true => false
         navigate('/')
     }
     setLoader(false)
    },[authStatus])
  return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default ProtectedRoute
