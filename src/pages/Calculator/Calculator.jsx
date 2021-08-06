import React from "react";
import { Link } from "react-router-dom";
import Inner from "./components/Inner";

const Calculator = () => {
  return (
    <main className='calculator-main center'>
      <div className='shapes mobile-none'>
        <div className='sphere'></div>
      </div>
      <Link to='/' className='arrow'>
        <svg
          width='27'
          height='27'
          viewBox='0 0 27 27'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M12.375 5.625L4.5 13.5L12.375 21.375'
            stroke='#00A17D'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M4.5 13.5H22.5'
            stroke='#00A17D'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </Link>
      <Inner />
    </main>
  );
};

export default Calculator;
