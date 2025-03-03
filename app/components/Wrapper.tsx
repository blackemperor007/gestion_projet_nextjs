type WrapperProps = {
    children: React.ReactNode
  }
  
  import { FolderGit2 } from 'lucide-react'
  import React from 'react'
import Navbar from './Navbar'
  
  const Wrapper = ({children} : WrapperProps) => {
    return (
      <div>
        <Navbar></Navbar>
          <div  className='px-5 md:px-(10%] mb-10 mt-8'>
              {children}
          </div>
      </div>
    )
  }
  
  export default Wrapper