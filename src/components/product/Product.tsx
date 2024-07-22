import React from "react";
import { GrProjects } from "react-icons/gr";
import "./product.css";
import { ProductProps } from "../../types";
import { BsThreeDots } from "react-icons/bs";

const Product: React.FC<ProductProps> = ({
  onClickEvent,
  product,
  openOptions,
  options,
  deleteProduct,
  updateProduct,
}) => {
  const optionsNav = [
    {
      name: "update",
    },
    {
      name: "delete",
    },
  ];
  if (!product.id) return <div>Error</div>;
  return (
    <div className="gogo__product" onClick={() => onClickEvent(product.id)}>
      <div className="gogo__product__options__section">
        <div
          className="gogo__select__options"
          onClick={(e) => openOptions(e, product.id || -1)}
        >
          <BsThreeDots />
        </div>

        {options?.isUserWantToSeeOptions &&
          options?.isUserWantToSeeOptions.productId === product.id && (
            <div className="options_nav">
              {optionsNav.map((currentNav) => (
                <span
                  onClick={(e) =>
                    currentNav.name === "update"
                      ? updateProduct(e, product.id || -1)
                      : deleteProduct(e, product.id || -1)
                  }
                >
                  {currentNav.name}
                </span>
              ))}
            </div>
          )}
      </div>
      <div className="gogo__product__name">
        <h2>{product.name}</h2>
      </div>
      <div className="gogo__product__icon">
        <GrProjects />
      </div>
      <div className="gogo__extra__details">
        <h3>Created At: {product.createdDate?.toString()}</h3>
        <h3>Updated At: {product.updatedAt}</h3>
      </div>
    </div>
  );
};

export default Product;
