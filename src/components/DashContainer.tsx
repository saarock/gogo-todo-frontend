import React from "react";
import { ChildrenProps } from "../types";
import SideBar from "./sidebar/SideBar";

const DashContainer: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="gogo__dash__container">
        <div className="gogo__side__bar">
          <SideBar />
      </div>

      <div className="gogo__dash__child">{children}</div>
    </div>
  );
};

export default React.memo(DashContainer);
