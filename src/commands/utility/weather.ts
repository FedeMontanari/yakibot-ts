import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import errorResponse from "../../utils/errorResponse";
import WeatherEmbedBuilder from "../../utils/weatherEmbedBuilder";
import getGeolocation from "../../utils/getGeolocation";

const { WEATHER_API } = process.env;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Get the current weather of a city")
    .addStringOption((option) =>
      option
        .setName("location")
        .setDescription(
          "Type the name of the city. (Example: Austin; London; Buenos Aires)"
        )
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: false });

    let location = interaction.options.get("location")?.value;
    location = location?.toString().replace(" ", "%20");

    try {
      const { lat, lon } = await getGeolocation(location?.toString() || "");

      if (lat && lon) {
        try {
          const resMetric = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API}`
          );
          const metric = await resMetric.json();

          const resImperial = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_API}`
          );
          const imperial = await resImperial.json();
          return await interaction.editReply({
            embeds: [WeatherEmbedBuilder(metric, imperial)],
          });
        } catch (error) {
          console.error(error);
          return await interaction.editReply(errorResponse.weather);
        }
      } else {
        console.error("Geo API didn't provide data");
        return await interaction.editReply(errorResponse.noLocationInfo);
      }
    } catch (error) {
      console.error(error);
      return await interaction.editReply(errorResponse.noLocationInfo);
    }
  },
};
