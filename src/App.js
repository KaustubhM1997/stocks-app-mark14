import "./styles.css";
import React from "react";
import { useState } from "react";
import stocks from "./stocks.svg";

export default function App() {
  const [initialPrice, setInitialPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [currentPrice, setCurrentPrice] = useState();
  const [color, setColor] = useState();
  const [result, setResult] = useState();

  function checkHandler(event) {
    event.preventDefault();

    let diff, percent, msg;

    // convert to number *IMP* (when accessing something from the DOM, the default type is string. So we need to convert that to int by either using Number() or parseInt())

    let initialAmount = Number(initialPrice);
    let quantityTaken = Number(quantity);
    let priceCurrent = Number(currentPrice);

    if (initialAmount > 0 && quantityTaken > 0 && priceCurrent > 0) {
      if (initialAmount > priceCurrent) {
        // loss
        diff = initialAmount - priceCurrent;

        percent = (diff / initialAmount) * 100;

        console.log(percent);

        msg = `There's a ${percent.toFixed(2)}% loss. You have lost ₹${(
          diff * quantityTaken
        ).toFixed(2)} 😞`;

        if (percent > 50) {
          setColor("#FF5353");
        } else {
          setColor("#E5E7EB");
        }
      } else if (priceCurrent > initialAmount) {
        // profit
        diff = priceCurrent - initialAmount;
        percent = (diff / initialAmount) * 100;

        msg = `There's a ${percent.toFixed(2)}% profit. You've gained ₹${(
          diff * quantityTaken
        ).toFixed(2)} 😀`;

        if (percent > 50) {
          setColor("#34D399");
        } else {
          setColor("#E5E7EB");
        }
      } else {
        // no profit or loss
        msg = "You're still! 😐";
        setColor("#E5E7EB");
      }
    } else {
      msg = "Please enter values greater than zero.";
    }

    setResult(msg);
  }

  return (
    <div style={{ backgroundColor: color }} className="App">
      <header>
        <h1>Check Profit or Loss on your Stocks</h1>
      </header>

      <div className="wrapper">
        <div className="main">
          <p className="headingText">
            Enter the cost price of your stock, the number of units you bought,
            and the current price of the stock below.
          </p>

          <form>
            <label>Purchased at: (Rupees) </label>
            <input
              onChange={(event) => setInitialPrice(event.target.value)}
              type="number"
              autoFocus
              required
            ></input>

            <label>Units purchased</label>
            <input
              onChange={(event) => setQuantity(event.target.value)}
              type="number"
              required
            ></input>

            <label>Current value at: (Rupees) </label>
            <input
              onChange={(event) => setCurrentPrice(event.target.value)}
              type="number"
              required
            ></input>

            <button
              type="submit"
              className="btn"
              onClick={(event) => checkHandler(event)}
            >
              Check
            </button>
          </form>
          <div id="result">{result}</div>
        </div>

        <div className="stock_img">
          <img src={stocks} alt="Stocks" className="stocks" />
        </div>
      </div>

      <footer>
        <a
          className="link"
          href="https://kaustubh-m.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kaustubh Manglurkar
        </a>
      </footer>
    </div>
  );
}
