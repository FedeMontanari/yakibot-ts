import { TimezoneApi } from "../types/TimezoneApi";

export default function TimezonesEmbedBuilder(info: TimezoneApi) {
  const newEmbed = {
    color: 0x24445c,
    title: `${info.cityName} :flag_${info.countryCode.toLowerCase()}:`,
    author: {
      name: "Timezone DB",
      icon_url: "https://cdn.timezonedb.com/assets/img/logo.png",
      url: "https://timezonedb.com",
    },
    fields: [
      {
        name: "Country",
        value: `${info.countryName}`,
        inline: true,
      },
      {
        name: "Region",
        value: `${info.regionName}`,
        inline: true,
      },
      {
        name: "City",
        value: `${info.cityName}`,
      },
      {
        name: "Timezone Abbreviation",
        value: `${info.abbreviation}`,
      },
      {
        name: "Time:watch:",
        value: `${info.formatted}`,
      },
    ],
  };
  return newEmbed;
}
