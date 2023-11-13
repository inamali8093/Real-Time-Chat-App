import { useEffect, useState } from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import ChatRoom from './components/ChatRoom'
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
