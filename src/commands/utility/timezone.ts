import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import errorResponse from "../../utils/errorResponse";
import getGeolocation from "../../utils/getGeolocation";
import TimezonesEmbedBuilder from "../../utils/timezoneEmbedBuilder";
import { TimezoneApi } from "../../types/TimezoneApi";

const { TIMEZONE_API } = process.env;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timezone")
    .setDescription("Get the current time of a specific timezone")
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
      const { lat, lon } = await getGeolocation(location || "");

      if (lat && lon) {
        try {
          const res = await fetch(
            `http://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONE_API}&format=json&by=position&lat=${lat}&lng=${lon}`
          );
          const timezone: TimezoneApi = await res.json();
          return await interaction.editReply({
            embeds: [TimezonesEmbedBuilder(timezone)],
          });
        } catch (error) {
          console.error(error);
          return await interaction.editReply(errorResponse.timezone);
        }
      } else {
        return await interaction.editReply(errorResponse.noLocationInfo);
      }
    } catch (error) {
      console.error(error);
      return await interaction.editReply(errorResponse.noLocationInfo);
    }
  },
};
