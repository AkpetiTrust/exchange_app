import React, { useState, useEffect, useRef } from "react";
import Loading from "./Loading/Loading";

const Inner = () => {
  const fromCurrency = useRef("BTC");
  const toCurrency = useRef("BTC");

  const [map, setMap] = useState([]);

  const paragraph = useRef(null);
  const toInput = useRef(null);
  const fromInput = useRef(null);

  const convert = (fromCurrency, toCurrency, fromValue) => {
    fetch(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${fromCurrency}&tsyms=${toCurrency}&api_key=5d430aae2f069034b3334addf3f224145c187aa3644c07303886f09fe1e3f19a`
    )
      .then((res) => res.json())
      .then((data) => {
        const toValue = data?.[fromCurrency]?.[toCurrency] * fromValue;
        if (isNaN(toValue)) return;
        toInput.current.value = toValue;
        paragraph.current.innerHTML = `${fromValue}${fromCurrency} = ${toValue}${toCurrency}`;
      });
  };

  useEffect(() => {
    fetch(
      "https://min-api.cryptocompare.com/data/all/coinlist?summary=true&api_key=5d430aae2f069034b3334addf3f224145c187aa3644c07303886f09fe1e3f19a"
    )
      .then((res) => res.json())
      .then((data) => {
        let mapArray = [];
        let responseData = data.Data;
        mapArray = Object.keys(responseData).sort(
          (a, b) => a.length - b.length
        );
        setMap(mapArray);
      });
  }, []);

  if (!map.length) {
    return (
      <main className='calculator-main center'>
        <Loading />
      </main>
    );
  }

  return (
    <section className='inner'>
      <div className='input-area'>
        <input
          type='text'
          list='list'
          className='list-input'
          defaultValue={fromCurrency.current}
          onChange={(e) => {
            const value = e.currentTarget.value.toUpperCase();
            if (!map.includes(value)) return;
            fromCurrency.current = value;
            convert(
              fromCurrency.current,
              toCurrency.current,
              Number(fromInput.current.value)
            );
          }}
        />
        <datalist id='list'>
          {map.map((currencyName, index) => (
            <option key={index} value={currencyName}>
              {currencyName}
            </option>
          ))}
        </datalist>
        <input
          type='number'
          className='number-input'
          defaultValue='1'
          ref={fromInput}
          onChange={(e) => {
            let value = Number(e.currentTarget.value);
            if (!value) return;
            convert(fromCurrency.current, toCurrency.current, value);
          }}
        />
      </div>

      <div className='middle center'>
        <svg
          width='52'
          height='52'
          viewBox='0 0 52 52'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M0 17.0625V15.4375C0 14.0913 1.09129 13 2.4375 13H39V8.12499C39 5.9549 41.6304 4.87072 43.1611 6.40137L51.2861 14.5264C52.238 15.4783 52.238 17.0217 51.2861 17.9735L43.1611 26.0985C41.6362 27.6232 39 26.5541 39 24.375V19.5H2.4375C1.09129 19.5 0 18.4087 0 17.0625ZM49.5625 32.5H13V27.625C13 25.4603 10.3734 24.3669 8.83888 25.9014L0.713883 34.0264C-0.237961 34.9783 -0.237961 36.5217 0.713883 37.4735L8.83888 45.5985C10.3652 47.1247 13 46.0522 13 43.875V39H49.5625C50.9087 39 52 37.9087 52 36.5625V34.9375C52 33.5913 50.9087 32.5 49.5625 32.5Z'
            fill='#6E4BE7'
          />
        </svg>
      </div>

      <div className='input-area'>
        <input
          type='text'
          list='list'
          className='list-input'
          defaultValue={toCurrency.current}
          onChange={(e) => {
            const value = e.currentTarget.value.toUpperCase();
            if (!map.includes(value)) return;
            toCurrency.current = value;
            convert(
              fromCurrency.current,
              toCurrency.current,
              Number(fromInput.current.value)
            );
          }}
        />
        <input
          disabled
          type='number'
          className='number-input'
          value='1'
          ref={toInput}
        />
      </div>

      <div className='center'>
        <p className='talk' ref={paragraph}>
          1BTC = 1BTC
        </p>
      </div>
    </section>
  );
};

export default Inner;
