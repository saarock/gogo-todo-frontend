import React, { useMemo } from 'react' // Import forwardRef from 'react'
import { ProductHeaderProps } from '../../types'
import Input from '../input/Input'
import './productheader.css'
import Button from '../button/Button'
import { IoIosCreate } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { BiLeftArrow, BiLeftArrowCircle } from 'react-icons/bi'
import { color } from '../../utils'
import useTheme from '../../context/modeContext.ts'
/**
 * @note (Don't get confuse between the ProductHeader and ProductHeaders file one (## ProductHeaders ## ) is for when user visit at the project level where user can see
 *  all the Product/ Project and get the pagination, search features and another ProductHeader is for the only individual product where user can create the new Project/ Product
 *  and can get the update the product name feature as well as search also;
 *  )
 * @param props
 * @returns ProductHeader for more information read the @note section;
 */
const ProductHeader: React.FC<ProductHeaderProps> = ({
    boardInputOnChange,
    boardName,
    addBoard,
    value,
    addProduct,
    isUserWantToCreateTheProduct,
    saveProject,
    onChangeTitle,
    userProject,
}) => {
    const navigate = useNavigate()
    const theme = useTheme()
    return (
        <div>
            {/* Forward the ref to the div element */}
            {userProject ? (
                <div className="gogo__product__level__header">
                    <div>
                        <button className="gogo__product__header__nav">
                            <span
                                onClick={() => navigate('/dash/projects')}
                                className="gogo__back__icon"
                            >
                                <BiLeftArrowCircle /> Back
                            </span>
                        </button>
                    </div>
                    <div className="gogo__product__title">
                        {userProject.name || 'Project Title'}
                    </div>
                    <div className="gogo__product__create__div">
                        <Input
                            className={`gogo__create__product__input ${theme.themeMode == 'dark' ? 'gogo__dark__input' : ''}`}
                            onChange={boardInputOnChange}
                            placeholder="Add Boards"
                            value={boardName}
                        />
                        <button
                            onClick={() => addBoard()}
                            className="gogo__create__product__button"
                        >
                            <span className="gogo__create__icon">
                                <IoIosCreate />
                            </span>
                            Add Board
                        </button>
                    </div>
                </div>
            ) : (
                <div className="gogo__create__new__product__container">
                    <button className="gogo__product__header__nav">
                        <span
                            onClick={() => navigate('/dash/projects')}
                            className="gogo__back__icon"
                        >
                            <BiLeftArrowCircle /> Back
                        </span>
                    </button>
                    <button
                        className="gogo__show__to__create__newproduct__button"
                        onClick={addProduct}
                    >
                        Create New Project
                    </button>
                    {isUserWantToCreateTheProduct ? (
                        <div className="gogo__create__new__product">
                            <Input
                                onChange={onChangeTitle}
                                value={value}
                                placeholder="New Unique Project Name..."
                            />
                            <button
                                onClick={saveProject}
                                className="gogo__new__project__save__button"
                            >
                                {<IoIosCreate />}Save
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            )}
        </div>
    )
}

export default ProductHeader // Forward the ref to the ProductHeader component
