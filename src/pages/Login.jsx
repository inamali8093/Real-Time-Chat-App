import React, { useEffect, useState } from 'react'
import {AppContainer,Button,InputField} from '../index'
import { Link,useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import authService from '../appwrite/authentication'
import { useDispatch } from 'react-redux'
import authSlice ,{loginState } from '../store/authSlice'

const Login = () => {

  const [error,setError] = useState('')
  const {register,handleSubmit} = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const login = async (data) =>{
    //console.log('data:',data)
    setError("")
    try {
      const session = await authService.login(data)
     // console.log("session:",session);
      if(session){
        const userData = await authService.getCurrentUser()
        console.log("userData:",userData);
        if(userData) dispatch(loginState(userData))
         navigate('/') 
      }
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(()=>{
    console.log(authSlice.state);
    if(authSlice.state){
      navigate('/')
    }
  },[])




  return (
    <>
     <AppContainer>
         {/* heading */}
         <div className='w-[80%] outline flex justify-center'>
           <h1 className='text-4xl font-bold'>Login to Chit-Chat</h1>
        </div>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        <form className='w-full flex flex-col items-center gap-8' onSubmit={handleSubmit(login)}>
           {/* email input */}
           <InputField
            placeholder='email'
            type='email'
            {...register("email",{
              required: true,
              validate: {
                pattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address"
              }
            })}
            />
           {/* password input */}
           <InputField
            placeholder='password'
            type="password"
            {...register("password",{
              required: true,
              minLength:8
            })}
            />
           {/* Login button */}
           <Button type='submit'>Login</Button>
           </form>
           <small>Don't have an account ? <Link to='/signup' className='text-blue-500 font-semibold'> Signup here</Link></small>
    </AppContainer> 
    </>
  )
}

export default Login
