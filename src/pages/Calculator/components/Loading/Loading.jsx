import React from "react";
import style from "./index.module.css";

const Loading = () => {
  return (
    <div className={`${style.loading} center`}>
      <div className={style.loading_inner}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loading;
