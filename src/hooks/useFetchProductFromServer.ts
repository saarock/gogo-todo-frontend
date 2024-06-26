import { useDispatch, useSelector } from "react-redux";
import { productServerService } from "../services";
import { Project, RootState, UseFetchProductFromServerParameterTypes } from "../types";
import { addProducts } from "../features/ProductSlice";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";


let onlyOneTimeRun = false;

export default function useFetchProductFromServer(useFetchParams: UseFetchProductFromServerParameterTypes ) {
  const dispatch = useDispatch();
  const userID = useSelector((state: RootState) => state.auth.user?.id);


  useEffect(() => {
    if (!onlyOneTimeRun) {
      ; (async () => {
        if(!userID) return;
        onlyOneTimeRun = true;  
        try {
          const products = await productServerService.getProducts(userID, useFetchParams.page || 0);
          if (products && products.length >= 1) {
            const product: Project[] = products;
            dispatch(addProducts(product));
          } 
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        }
      })();
    }

    return () => {
    }
  }, [userID]); 

}
