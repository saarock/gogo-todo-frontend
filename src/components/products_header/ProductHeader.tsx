import React from 'react';

const ProductHeader = () => {
    return (
        <div>
            <nav className="flex items-center justify-between bg-gray-200 p-4 rounded-md">
                <div>
                    <a href="#" className="text-gray-800 font-bold text-lg text-red-500">GoGo.com</a>
                </div>
                <div>
                    <input type="text" placeholder="Search..." className="py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <nav className="inline-flex">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-l-md">Previous</button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-r-md">Next</button>
                    </nav>
                </div>
            </nav>
        </div>
    );
};

export default ProductHeader;
