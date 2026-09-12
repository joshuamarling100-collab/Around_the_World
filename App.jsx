import React, { useEffect, useState } from "react";
import AirportMap from "./AirportMap";
import { getDistanceInKm } from "./distance";
import "./App.css";

const App = () => {
  const [airport, setAirport] = useState(null);
  const [guess, setGuess] = useState(null);

  async function loadRandomAirport() {
    const response = await fetch(
      "https://airports.mimo.dev/api/random-airport",
    );
    const data = await response.json();
    setAirport(data);
    setGuess(null);
  }

  useEffect(() => {
    loadRandomAirport();
  }, []);

  const distance = guess && airport && getDistanceInKm(guess, airport);

  return (
    <>
      {airport && (
        <>
          <h1 className="prompt">Where is {airport.name}?</h1>
          {distance !== null && (
            <p className="result">
              The airport is <strong>{distance.toLocaleString()} km</strong>{" "}
              from your guess.
            </p>
          )}
        </>
      )}
      <AirportMap airport={airport} guess={guess} onGuess={setGuess} />
      <button onClick={loadRandomAirport}>
        Next airport
      </button>
    </>
  );
};

export default App;
