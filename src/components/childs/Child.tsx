import React from "react";

const Child = (navs: Array<string>) => {
  return (
    <>
      {navs.map((nav) => {
        <li>{nav}</li>;
      })}
    </>
  );
};

export default Child;
