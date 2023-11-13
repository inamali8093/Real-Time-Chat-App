import React from 'react'

const AppContainer = ({children}) => {
  return (
    <>
      <div className='max-w-full w-full flex justify-center py-8'>
        <div className='min-w-md outline w-[80%] md:w-[60%] flex flex-col justify-center items-center gap-8 py-6'>
          {/* from here components starts */}
          {children}
        {/* here components ends */}
        </div>
      </div>
    </>
  )
}

export default AppContainer
