import React from 'react'
import Header from './Header'
import AppContainer from './AppContainer'
import { loginState,logoutState } from '../store/authSlice'
import { useSelector,useDispatch } from 'react-redux'

const ChatRoom = () => {
    
  const dispatch = useDispatch()
  const authStatus = useSelector(state => state.auth.status)
  console.log(authStatus)


  return (
    <>
     <Header />
      <div className='max-w-full w-full flex justify-center '>
        <div className='min-w-md outline w-[80%] md:w-[60%]  p-6'>
          {/* from here components starts */}
          <div className='outline bg-red-500 w-fit p-2'>
            hello world
          </div>
        {/* here components ends */}
        </div>
      </div>
    </>
  )
}

export default ChatRoom
