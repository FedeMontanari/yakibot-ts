import { WeatherApi } from "../types/OpenWeatherApi";

const { EmbedBuilder } = require("discord.js");

export default function WeatherEmbedBuilder(
  metric: WeatherApi,
  imperial: WeatherApi
) {
  const newEmbed = new EmbedBuilder()
    .setColor("#EA6D4B")
    .setAuthor({
      name: "Open Weather",
      iconURL:
        "https://cdn.discordapp.com/attachments/1091205360183947354/1132085495762014298/image.png",
    })
    .setTitle(`Current weather: ${metric.weather[0].main}`)
    .addFields({
      name: `${metric.name} :flag_${metric.sys.country.toLowerCase()}:`,
      value: " ",
    })
    .addFields({
      name: "Temp :thermometer:",
      value: `${metric.main.temp}° C\n${imperial.main.temp}° F`,
      inline: true,
    })
    .addFields({
      name: "Feels Like :thermometer:",
      value: `${metric.main.feels_like}° C\n${imperial.main.feels_like}° F`,
      inline: true,
    })
    .addFields({
      name: "\u200B",
      value: "\u200B",
    })
    .addFields({
      name: "Pressure :timer:",
      value: `${metric.main.pressure} hPa`,
      inline: true,
    })
    .addFields({
      name: "Humidity :droplet:",
      value: `${metric.main.humidity} %`,
      inline: true,
    })
    .setImage(
      `https://openweathermap.org/img/wn/${metric.weather[0].icon}@4x.png`
    )
    .setTimestamp();
  return newEmbed;
}

/*

{
  coord: { lon: -64.2595, lat: -27.7877 },
  weather: [
    {
      id: 804,
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04n'
    }
  ],
  base: 'stations',
  main: {
    temp: 81.7,
    feels_like: 81,
    temp_min: 81.7,
    temp_max: 81.7,
    pressure: 999,
    humidity: 38,
    sea_level: 999,
    grnd_level: 978
  },
  visibility: 10000,
  wind: { speed: 17.56, deg: 10, gust: 37.38 },
  clouds: { all: 97 },
  dt: 1689977477,
  sys: { country: 'AR', sunrise: 1689937477, sunset: 1689975713 },
  timezone: -10800,
  id: 3835869,
  name: 'Santiago del Estero',
  cod: 200
}
*/
