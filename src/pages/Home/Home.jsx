import React from "react";
import Preloader from "./components/Preloader/Preloader";
import Main from "./components/Main/Main";

const Home = () => {
  return (
    <div className='home'>
      <Preloader />
      <Main />
    </div>
  );
};

export default Home;
