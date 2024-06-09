import React, {  } from 'react'; // Import forwardRef from 'react'
import { ProductHeaderProps } from '../../types';
import Input from '../input/Input';

const ProductHeader: React.FC<ProductHeaderProps> = ({boardInputOnChange, boardName,  addBoard, value, addProduct, isUserWantToCreateTheProduct, saveProject, onChangeTitle, userProject }) => {

  return (
    <div> {/* Forward the ref to the div element */}
      {
        userProject ? (
          <div className="bg-gray-800 p-4 flex justify-between items-center w-fit">
            <div className="text-white text-lg">
              {userProject.name || "Project Title"}
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 rounded-md text-gray-800"
              />
              <Input
                onChange={boardInputOnChange}
                placeholder='Add Boards'
                value={boardName}
              />
              <button
                onClick={addBoard}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add Board
              </button>
            </div>
          </div>
        ) : (

          <div>
            <button className='gogo__add__button' onClick={addProduct}>Create New Project</button>
            {
              isUserWantToCreateTheProduct ? (
                <div className="gogo__create__new__product">
                  <Input onChange={onChangeTitle} value={value} />
                  <button onClick={saveProject}>Save</button>
                </div>
              ) : ""
            }
          </div>
        )
      }

    </div>
  );
};

export default ProductHeader; // Forward the ref to the ProductHeader component
