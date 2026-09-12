import React, { useEffect } from "react";

const AirportMap = ({ airport, guess, onGuess }) => {
  useEffect(() => {
    if (!airport) return;

    const L = window.L;

    const map = L.map("map").setView([0, 0], 0);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    map.on("click", (event) => {
      onGuess({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    });

    let airportMarker = null;
    let guessMarker = null;
    let line = null;

    if (guess) {
      const guessPosition = [guess.latitude, guess.longitude];
      const airportPosition = [airport.latitude_deg, airport.longitude_deg];

      airportMarker = L.marker(airportPosition)
        .addTo(map)
        .bindPopup(airport.name)
        .openPopup();
      guessMarker = L.marker(guessPosition)
        .addTo(map);
      line = L.polyline([guessPosition, airportPosition]).addTo(map);
      map.fitBounds([guessPosition, airportPosition], { padding: [40, 40] });
    }

    return () => {
      if (airportMarker) {
        airportMarker.remove();
      }

      if (guessMarker) {
        guessMarker.remove();
      }

      if (line) {
        line.remove();
      }

      map.remove();
    };
  }, [airport, guess]);

  return <div id="map" className="map" />;
};

export default AirportMap;
