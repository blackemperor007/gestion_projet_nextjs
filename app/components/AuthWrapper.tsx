type WrapperProps = {
  children: React.ReactNode
}

import React from 'react'

const AuthWrapper = ({children} : WrapperProps) => {
  return (
    <div className='h-screen flex justify-center items-center flex-col'>
        <div>
            {children}
        </div>
    </div>
  )
}

export default AuthWrapper