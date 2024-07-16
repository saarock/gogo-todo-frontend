import { useDispatch, useSelector } from "react-redux";
import { productServerService } from "../services";
import { Project, RootState, UseFetchProductFromServerParameterTypes } from "../types";
import { addProducts } from "../features/ProductSlice";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { last } from "lodash";


let onlyOneTimeRun = false;

export default function useFetchProductFromServer(useFetchParams: UseFetchProductFromServerParameterTypes ) {
  const dispatch = useDispatch();
  const [isLast, setIsLast] = useState<boolean>(false);
  const userID = useSelector((state: RootState) => state.auth.user?.id);


  useEffect(() => {
    if (!onlyOneTimeRun) {
      ; (async () => {
        if(!userID) return;
        onlyOneTimeRun = true;  
        try {
          const products = await productServerService.getProducts(userID, useFetchParams.page || 0);
          console.log("hy")
          console.log(products.content)

          if (products.content && products.content.length >= 1) {

            const product: Project[] = products.content;
            dispatch(addProducts(product));
          } 
          setIsLast(products.last)
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

  return {isLast, setIsLast}
}
