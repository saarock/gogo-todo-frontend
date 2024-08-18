import React, {
    useCallback,
    useState,
    Suspense,
    useDeferredValue,
    useEffect,
    useReducer,
} from 'react'
import {
    CreateProduct,
    Loader,
    Product,
    ProductHeader,
    Update,
} from '../../components'
import './project.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    Project as UserProjectType,
    UserProject,
    ProductUpdateTypes,
    ProductNameandId,
    RootState,
    DeleteProduct,
} from '../../types'

import { TrophySpin } from 'react-loading-indicators'
import { AiOutlineReload } from 'react-icons/ai'
import { authClient, productServerService } from '../../services'
import {
    addProducts,
    updateProductName as UpdateProductInBothClientAndServer,
    deleteProduct as DeleteProductInBothClientAndServer,
    deleteProjects,
} from '../../features/ProductSlice'
import {
    ProductActionTypes,
    productReducer,
} from '../../reducer/product.reducer'
import { updateProduct as updatedProduct } from '../../features/ProductSlice'
import toast from 'react-hot-toast'
import DashContainer from '../../components/DashContainer'
import useFetchProductFromServer from '../../hooks/useFetchProductFromServer'
import { localStore } from '../../utils'
import { TypeOfBoard } from '../../reducer/board.reducer.ts'
import useTokenValidation from "../../hooks/useTokenValidation.ts";

const Project = () => {
    const [wantToCreateProduct, setwantToCreateProduct] =
        useState<boolean>(false)
    const {
        isLast,
        setIsLast,
        pageSize,
        pageNumber,
        setPageNumber,
        isLoading,
    } = useFetchProductFromServer({ page: 0 })
    const navigate = useNavigate()
    const projects: UserProjectType[] | undefined = useSelector(
        (state: UserProject) => state.projects
    )

    const user = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const [userDatas, setUserDatas] = useState<UserProjectType[] | undefined>(
        projects
    )
    const userAllProjects = useDeferredValue(userDatas)
    const [productState, productDispatch] = useReducer(productReducer, {
        productTitleOrName: '',
        isUserWantToSeeOptions: {
            productId: -1,
            isWantToSeeOptions: false,
            isUserWantToUpdate: false,
        },
    })

    // update state
    const [productName, setProductName] = useState<string>('')
    const [productId, setProductId] = useState<number>(-1)

    useEffect(() => {
        setUserDatas(projects)
    }, [projects])

    const letsCreateNewProject = useCallback(() => {
        setwantToCreateProduct(true)
        navigate('new-project')
    }, [wantToCreateProduct])

    const goToProduct = useCallback((projectName: string, id: number) => {
        productServerService.updateModifiedProduct(id)
        navigate(projectName)
    }, [])


    const next = useCallback(() => {
        try {
            ;(async () => {
                const data = await productServerService.getProducts(
                    user.user?.id!,
                    pageNumber + 1
                )
                const useProducts: UserProjectType[] = data.content
                await dispatch(addProducts(useProducts))
                localStore.updateIsMore(data.last)
                setIsLast(localStore.IsMoreProduct())
                setPageNumber((prev) => prev + 1)
            })()
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Sorry cannot load more projects'
            )
        }
    }, [user, pageNumber, isLast, pageNumber])

    const search = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const cache = [...projects]
            async function searchAndSave() {
                // search from the database;
                if (!user.isAuthenticated) authClient.logout()
                if (user.user?.id) {
                    try {
                        const searchProducts: UserProjectType[] =
                            await productServerService.searchProduct(
                                e.target.value,
                                user.user?.id
                            )

                        dispatch(addProducts(searchProducts))
                    } catch (error) {
                        toast.error(
                            error instanceof Error
                                ? error.message
                                : 'Error while search product'
                        )
                    }
                }
            }

            const products = projects?.filter((project) =>
                project.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            )

            if (!products) {
                searchAndSave()
                return
            }
            if (products?.length >= 1) {
                setUserDatas(products)
            } else {
                searchAndSave()
            }
        },
        [userDatas, user]
    )

    const openOptions = useCallback(
        (e: React.MouseEvent<HTMLDivElement>, productId: number) => {
            e.stopPropagation()
            if (productId.toString().trim() === '') return

            productDispatch({
                type: ProductActionTypes.IS_USER_WANT_TO_SEE_THE_OPTIONS_OF_THE_PRODUCT,
                payload: {
                    productId:
                        productState.isUserWantToSeeOptions?.productId === -1
                            ? productId
                            : -1,
                    isWantToSeeOptions:
                        !productState.isUserWantToSeeOptions
                            ?.isWantToSeeOptions,
                },
            })
        },
        [
            productState.isUserWantToSeeOptions?.isWantToSeeOptions,
            productState.isUserWantToSeeOptions?.productId,
        ]
    )

    const deleteProduct = useCallback(
        async (e: React.MouseEvent<HTMLSpanElement>, productId: number) => {
            e.stopPropagation()
            try {
                const deleteProductObject: DeleteProduct = {
                    productId,
                }
                await dispatch<any>(
                    DeleteProductInBothClientAndServer(deleteProductObject)
                )
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : 'Cannot delete the project try again'
                )
            }
        },
        []
    )

    const commitUpdate = (
        e: React.ChangeEvent<HTMLSpanElement>,
        productId: number
    ) => {
        const updatedDetails: ProductUpdateTypes = {
            id: productId,
            name: 'yes',
        }
        dispatch(updatedProduct(updatedDetails))
    }

    const updateProduct = useCallback(
        (e: React.MouseEvent<HTMLSpanElement>, productId: number) => {
            e.stopPropagation()
            productDispatch({
                type: ProductActionTypes.IS_USER_WANT_TO_SEE_THE_OPTIONS_OF_THE_PRODUCT,
                payload: { isUserWantToUpdate: true },
            })
            setProductId(productId)
            // commitUpdate(e, productId)
        },
        []
    )

    const hideUpdateComp = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            productDispatch({
                type: ProductActionTypes.IS_USER_WANT_TO_SEE_THE_OPTIONS_OF_THE_PRODUCT,
                payload: {
                    isUserWantToUpdate: false,
                    productId: -1,
                    isWantToSeeOptions: false,
                },
            })
        },
        []
    )

    const getNewProductName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            setProductName(value)
        },
        [productName, productId]
    )

    const updateProductName = useCallback(
        async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            if (!productName.trim()) {
                toast.error('New Product Name required')
                return
            }

            const updatedDetailsWithIdAndNewName: ProductNameandId = {
                productId,
                productName,
            }
            try {
                await dispatch<any>(
                    UpdateProductInBothClientAndServer(
                        updatedDetailsWithIdAndNewName
                    )
                )
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : 'Unknown error while updating the product'
                )
            }
            setProductName('')
        },
        [productName, productId]
    )

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            {productState.isUserWantToSeeOptions?.isUserWantToUpdate && (
                <Update
                    hideUpdateComp={hideUpdateComp}
                    onChangeEventForUpdateTheProductName={getNewProductName}
                    productName={productName}
                    updateClick={updateProductName}
                />
            )}
            <div className="gogo__projects__container">
                <DashContainer>
                    <div className="gogo__products">
                        <div className="gogo__product__nav">
                            <ProductHeader next={search} />
                        </div>
                        <div className="gogo__product__products">
                            <CreateProduct
                                createProject={letsCreateNewProject}
                            />

                            {userAllProjects && userAllProjects.length >= 1 ? (
                                userAllProjects.map(
                                    (project: UserProjectType) => (
                                        <div
                                            className="gogo__project"
                                            key={project.id}
                                        >
                                            <Suspense
                                                fallback={
                                                    <TrophySpin
                                                        color="#db3c63"
                                                        size="medium"
                                                    />
                                                }
                                            >
                                                <Product
                                                    onClickEvent={(
                                                        id: number
                                                    ) =>
                                                        goToProduct(
                                                            project.name ||
                                                                'newproject',
                                                            id
                                                        )
                                                    }
                                                    options={productState}
                                                    openOptions={openOptions}
                                                    product={project}
                                                    deleteProduct={
                                                        deleteProduct
                                                    }
                                                    updateProduct={
                                                        updateProduct
                                                    }
                                                    createAt={new Date().toLocaleDateString()}
                                                />
                                            </Suspense>
                                        </div>
                                    )
                                )
                            ) : (
                                <div className="gogo__no__project__found__title">
                                    No Projects Found...
                                </div>
                            )}
                            {projects && projects.length >= 1 && !isLast && (
                                <div className="gogo__load__button__container">
                                    <button
                                        className="gogo__load__more__button"
                                        onClick={next}
                                    >
                                        <AiOutlineReload />
                                        Load more
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </DashContainer>
            </div>
        </>
    )
}

export default Project
