import { GeoApi } from "../types/OpenWeatherApi";

const { WEATHER_API } = process.env;

export default async function getGeolocation(location: string) {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${WEATHER_API}&limit=1`
  );
  const data: GeoApi[] = await res.json();
  return {
    lat: data[0].lat,
    lon: data[0].lon,
  };
}
