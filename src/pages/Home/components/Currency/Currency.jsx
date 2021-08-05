import React, { useState, useEffect } from "react";
import style from "./index.module.css";

const Currency = ({ targetCurrency, activeCurrency, map }) => {
  const [imageBaseUrl, setImageBaseUrl] = useState("https://cryptocompare.com");
  const [imageUrl, setImageUrl] = useState("");

  const [currencyName, setCurrencyName] = useState("");

  const [currencyPrice, setCurrencyPrice] = useState("");

  useEffect(() => {
    setCurrencyName(() => {
      let activeCurrencyObject = map.filter(
        (currency) => currency.shortName === activeCurrency
      )[0];
      if (!activeCurrencyObject) return activeCurrency;
      return activeCurrencyObject.fullName;
    });

    fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${activeCurrency}&tsyms=USD,EUR,NGN`
    )
      .then((res) => res.json())
      .then((data) => {
        const responseData =
          data["DISPLAY"]?.[activeCurrency]?.[targetCurrency];
        setImageUrl(responseData?.IMAGEURL);
        setCurrencyPrice(responseData?.PRICE);
      });
  }, []);

  return (
    <div className={style.currency}>
      <img src={`${imageUrl ? imageBaseUrl + imageUrl : ""}`} />
      <p>{currencyName}</p>
      <p>{currencyPrice}</p>
    </div>
  );
};

export default Currency;
