import React,{ useState } from 'react'
import { AppContainer,InputField,Button } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/authentication'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { loginState } from '../store/authSlice'

const Signup = () => {
    const [error,setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    const {register,handleSubmit} = useForm()


    const create = async (data)=>{
      if(!(data.password===data.password2)) return alert("Please confirm the password correctly")
      setError('')
      try {
        //console.log("data:",data)
       let userData = await authService.createAccount(data)
       //console.log('userData:',userData)
       if(userData){
         const userData = await authService.getCurrentUser()
        //console.log(userData);
        if(userData) dispatch(loginState(userData));
        navigate("/")
       }
      } catch (error) {
        setError(error.message)
        console.log(error);
      }
    }

  return (
    <>
     <AppContainer>
        {/* heading */}
        <div className='w-[80%] outline flex justify-center'>
           <h1 className='text-4xl font-bold'>Signup to Chit-Chat</h1>
        </div>
          {error && <p className='text-red-500 text-center'>{error}</p>} 
        <form className='w-full flex flex-col items-center gap-8' onSubmit={handleSubmit(create)}> 
        {/* name input */}
        <InputField
         placeholder='name'
         {...register("name",{
          required: true
         })}
         />
           {/* email input */}
        <InputField
         placeholder='email'
         type= "email"
         {...register("email",{
          required: true,
          validate: {
            pattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
            "Email address must be a valid address",
          }
         })}
         />
           {/* password input */}
           <InputField
            placeholder='password'
            type= "password"
            {...register("password",{
              required: true,
              minLength: 8
            })}
            />
           {/* confirm password */}
           <InputField
            placeholder='confirm password'
            type='password'
            {...register("password2",{
              required: true,
              minLength: 8
            })}
            />
           {/* Signup button */}
           <Button>Create Account</Button>
          
           </form>
           <small>Already have an account ? <Link to='/login' className='text-blue-500 font-semibold'> Login here</Link></small>
    </AppContainer> 
    </>
  )
}

export default Signup
