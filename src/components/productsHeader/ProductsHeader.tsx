import React from 'react';
import { ProjectHeaderProps } from '../../types';
import "./projectHeader.css"

/**
 * @note (Don't be the configue between the ProductHeader and ProductHeaders file one (## ProductHeaders ## ) is for when user visit at the project level where user can see 
 *  all the Product/ Project and get the pagination, search features and another ProductHeader is for the only individual product where user can create the new Project/ Product
 *  and can get the update the product name feature as well as search also;
 *  )
 * @param props
 * @returns ProductHeader for more inmormation read the @note section;
 */

const ProductHeaders: React.FC<ProjectHeaderProps> = ({next}) => {
    return (
        <div>
            <nav className="flex items-center justify-between p-4 rounded-md gogo__project__level__header" >
                <div>
                    <a href="#" className="gogo__logo font-bold text-lg">GoGo.com</a>
                </div>
                <div>
                    <input onChange={next} type="text" placeholder="Search..." className="gogo__project__search py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <nav className="inline-flex">
                        {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-l-md" onClick={prev}>Previous</button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-r-md" style={{position: "fixed", top: 0, zIndex: 999}} onClick={next}>Load More</button> */}
                    </nav>
                </div>
            </nav>
        </div>
    );
};

export default ProductHeaders;
