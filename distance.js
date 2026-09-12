const EARTH_RADIUS_KM = 6371;
const toRadians = (degrees) => degrees * (Math.PI / 180);

export function getDistanceInKm(guess, airport) {
  const lat1 = toRadians(guess.latitude);
  const lat2 = toRadians(airport.latitude_deg);
  const deltaLat = lat2 - lat1;
  const deltaLon = toRadians(airport.longitude_deg - guess.longitude);
  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
  return Math.round(2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(haversine)));
}
