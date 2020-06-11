import React from "react";

const Main = ({ data }) => {
  return (
    <>
      {data.map((el) => (
        <p key={el._id}>
          {el.materialName} - {el.materialType}
        </p>
      ))}
    </>
  );
};

export default Main;
