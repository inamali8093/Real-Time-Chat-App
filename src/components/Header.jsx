import React from 'react'
import AppContainer from './AppContainer'
import { LogOut } from 'react-feather'
import { Link } from 'react-router-dom'

const Header = ({username}) => {
  return (
    <>
      <AppContainer>
        <div className='flex justify-between w-full px-4'>
            <div>{username}</div>
            <div><Link to='/login'><LogOut /></Link></div>
        </div>
      </AppContainer>
    </>
  )
}

export default Header
