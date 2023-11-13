import React, { useId } from 'react'

const InputField = ({type="text",placeholder,...props},ref) => {
    const id = useId()
  return (
    <>
     <div className='outline w-[80%]'>
            <input 
              type={type} 
              className=' bg-red-500 w-full p-2 text-lg'
              placeholder={placeholder}
              ref={ref}
              // id={id}
              {...props}
              />
           </div> 
    </>
  )
}

export default React.forwardRef(InputField)
