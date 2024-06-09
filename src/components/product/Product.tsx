import React from 'react'
import { GrProjects } from "react-icons/gr";
import "./product.css"
import { ProductProps } from '../../types';

const Product: React.FC<ProductProps> = ({onClickEvent, productTitle, createAt}) => {
    return (
        <div className='gogo__product' onClick={onClickEvent}>

            <div className="gogo__product__name">
                <h2>{productTitle}</h2>
            </div>
            <div className="gogo__product__icon">
                <GrProjects />
            </div>
            <div className="gogo__extra__details">
                <h3>Created At: {createAt || new Date().toString()}</h3>
            </div>
        </div>
    )
}

export default Product