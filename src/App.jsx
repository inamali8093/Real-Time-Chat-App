import { useEffect, useState } from 'react'
import {Signup,Login,ChatRoom} from './index'
import { useForm } from 'react-hook-form'
import { Outlet } from 'react-router-dom'
import authService from './appwrite/authentication'
//import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
 
  useEffect(()=>{
    authService.getCurrentUser().finally(()=>setLoading(false))
  })
 

  return !loading ? (
    <>
    <Outlet />
    </>
  ) : null
  }

export default App
