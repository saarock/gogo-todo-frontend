import React, {
  useCallback,
  useState,
  Suspense,
  useDeferredValue,
  useEffect,
  useReducer,
} from "react";
import {
  CreateProduct,
  Product,
  ProductHeader,
  SideBar,
  Update,
} from "../../components";
import "./project.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Project as UserProjectType,
  UserProject,
  ProductUpdateTypes,
} from "../../types";

import { TrophySpin } from "react-loading-indicators";
import { AiOutlineReload } from "react-icons/ai";
import { productServerService } from "../../services";
import { addProducts } from "../../features/ProductSlice";
import {
  ProductActionTypes,
  productReducer,
} from "../../reducer/product.reducer";
import { updateProduct as updatedProduct } from "../../features/ProductSlice";

const Project = () => {
  const [wantToCreateProduct, setwantToCreateProduct] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const projects: UserProjectType[] | undefined = useSelector(
    (state: UserProject) => state.projects
  );
  const dispatch = useDispatch();
  const [userDatas, setUserDatas] = useState<UserProjectType[] | undefined>(
    projects
  );
  const userAllProjects = useDeferredValue(userDatas);
  const [productState, productDispatch] = useReducer(productReducer, {
    productTitleOrName: "",
    isUserWantToSeeOptions: {
      productId: -1,
      isWantToSeeOptions: false,
      isUserWantToUpdate: false,
    },
  });

  useEffect(() => {
    setUserDatas(projects);
  }, [projects]);

  const letsCreateNewProject = useCallback(() => {
    setwantToCreateProduct(true);
    navigate("new-project");
  }, [wantToCreateProduct]);

  const goToProduct = useCallback((projectName: string) => {
    // alert(projectName)
    navigate(projectName);
  }, []);

  const next = useCallback(() => {
    (async () => {
      const data = await productServerService.getProducts("1", 2);
      console.log(data);
      const useProducts: UserProjectType[] = data.data;
      await dispatch(addProducts(useProducts));
    })();
  }, []);

  const search = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserDatas(
        projects?.filter((project) => project.name.includes(e.target.value))
      );
    },
    [userDatas]
  );

  const openOptions = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, productId: number) => {
      e.stopPropagation();
      if (productId.toString().trim() === "" || productId === undefined) return;
      productDispatch({
        type: ProductActionTypes.IS_USER_WANT_TO_SEE_THE_OPTIONS_OF_THE_PRODUCT,
        payload: {
          productId:
            productState.isUserWantToSeeOptions?.productId === -1
              ? productId
              : -1,
          isWantToSeeOptions: productState.isUserWantToSeeOptions
            ?.isWantToSeeOptions
            ? false
            : true,
        },
      });
    },
    [
      productState.isUserWantToSeeOptions?.isWantToSeeOptions,
      productState.isUserWantToSeeOptions?.productId,
    ]
  );

  const deleteProduct = (
    e: React.MouseEvent<HTMLSpanElement>,
    productId: number
  ) => {};

  const commitUpdate = (
    e: React.ChangeEvent<HTMLSpanElement>,
    productId: number
  ) => {
    const updatedDetails: ProductUpdateTypes = { id: productId, name: "yes" };
    dispatch(updatedProduct(updatedDetails));
  };

  const updateProduct = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>, productId: number) => {
      e.stopPropagation();
      productDispatch({
        type: ProductActionTypes.IS_USER_WANT_TO_SEE_THE_OPTIONS_OF_THE_PRODUCT,
        payload: { isUserWantToUpdate: true },
      });
      // commitUpdate(e, productId)
    },
    []
  );

  const hideUpdateComp = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    productDispatch({
      type: ProductActionTypes.IS_USER_WANT_TO_SEE_THE_OPTIONS_OF_THE_PRODUCT,
      payload: {
        isUserWantToUpdate: false,
        productId: -1,
        isWantToSeeOptions: false,
      },
    });
  }, []);

  return (
    <>
      {productState.isUserWantToSeeOptions?.isUserWantToUpdate && (
        <Update hideUpdateComp={hideUpdateComp} />
      )}
      <div className="gogo__projects__container">
        <div className="gogo__side__bar">
          <SideBar />
        </div>
        <div className="gogo__products">
          <div className="gogo__product__nav">
            <ProductHeader next={search} />
          </div>
          <div className="gogo__product__products">
            <CreateProduct createProject={letsCreateNewProject} />
            {userAllProjects && userAllProjects.length >= 1 ? (
              [...userAllProjects].reverse().map((project: UserProjectType) => (
                <div className="gogo__project" key={project.id}>
                  <Suspense
                    fallback={
                      <TrophySpin
                        color="#db3c63"
                        size="medium"
                        text=""
                        textColor=""
                      />
                    }
                  >
                    <Product
                      onClickEvent={() =>
                        goToProduct(project.name || "newproject")
                      }
                      options={productState}
                      openOptions={openOptions}
                      product={project}
                      deleteProduct={deleteProduct}
                      updateProduct={updateProduct}
                      createAt={new Date().toLocaleDateString()}
                    />
                  </Suspense>
                </div>
              ))
            ) : (
              <div className="gogo__no__project__foudn__title">
                No Projects Found...
              </div>
            )}
            {projects && projects.length >= 1 && (
              <div className="gogo__load__button__container">
                <button className="gogo__load__more__button" onClick={next}>
                  {" "}
                  <AiOutlineReload />
                  Load more
                </button>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
