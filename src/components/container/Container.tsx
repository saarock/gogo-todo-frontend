import React from "react";
import { ChildrenProps } from "../../types";

const Container: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <div className="gogo_kan_home_container">{children}</div>
    </>
  );
};

export default Container;
