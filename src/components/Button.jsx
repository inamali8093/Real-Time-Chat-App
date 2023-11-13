import React from 'react'

const Button = ({children,type="submit"}) => {
  return (
    <>
      <button className='outline p-2 text-xl font-medium' type={type}>{children}</button>
    </>
  )
}

export default Button
