import React from 'react'
import { ChildrenProps } from '../types'
import SideBar from './sidebar/SideBar'

const ProductWrapper:React.FC<ChildrenProps> = ({children}) => {
  return (
    <div className='gogo-product-wrapper-container'>
    {children}
    </div>
  )
}

export default ProductWrapper