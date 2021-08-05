import React from "react";
import style from "./index.module.css";

const Preloader = () => {
  return (
    <div className={style.preloader}>
      <div className={`${style.slider} center`}>
        <p>
          <span>EXCHANGE</span>
        </p>
      </div>
    </div>
  );
};

export default Preloader;
