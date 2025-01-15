import React, { Suspense } from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex justify-center pt-20'>
      <Suspense>
      {children}
      </Suspense>
    </div>
  )
}

export default AuthLayout