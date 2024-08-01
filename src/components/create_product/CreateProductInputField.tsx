import React, { useState } from 'react'

const CreateProductInputField: React.FC<any> = ({ onCreate }) => {
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')

    const handleCreate = () => {
        // Validate input fields
        if (!productName || !productDescription) {
            alert('Please fill in all fields.')
            return
        }

        // Create product object
        const newProduct = {
            name: productName,
            description: productDescription,
        }

        // Pass the new product to the parent component for further processing
        onCreate(newProduct)

        // Clear input fields
        setProductName('')
        setProductDescription('')
    }

    return (
        <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Create New Product</h2>
            <div className="flex flex-col">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="py-2 px-4 mb-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                <textarea
                    placeholder="Product Description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="py-2 px-4 mb-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                ></textarea>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Create Product
                </button>
            </div>
        </div>
    )
}

export default CreateProductInputField
