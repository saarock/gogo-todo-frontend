import { useDispatch, useSelector } from "react-redux";
import {authClient, productServerService} from "../services";
import { Project, RootState, UseFetchProductFromServerParameterTypes } from "../types";
import { addProducts } from "../features/ProductSlice";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { last } from "lodash";
import { localStore } from "../utils";


let onlyOneTimeRun = false;

export default function useFetchProductFromServer(useFetchParams: UseFetchProductFromServerParameterTypes ) {
  const dispatch = useDispatch();
  const [isLast, setIsLast] = useState<boolean>(localStore.IsMoreProduct);
  const userID = useSelector((state: RootState) => state.auth.user?.id);
  const [pageSize, setPageSize] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);



  useEffect(() => {
      if (!onlyOneTimeRun) {
        ;(async () => {
          if(!userID) return;
          onlyOneTimeRun = true;
          try {
            setIsLoading(true)
            const products = await productServerService.getProducts(userID, pageNumber);
            if (products.content && products.content.length >= 1) {
              const product: Project[] = products.content;
              dispatch(addProducts(product));
            }
            setIsLast(products.last)
            localStore.updateIsMore(products.last)
            setPageSize(products.pageable.pageSize)
          } catch (error) {
            if (error instanceof Error) {
              toast.error(error.message);
            }
          }
          setIsLoading(false)
        })();

      }



    return () => {

    }
  }, [userID]);


  return {isLast, setIsLast, pageSize, setPageSize, pageNumber, setPageNumber, isLoading};
}
