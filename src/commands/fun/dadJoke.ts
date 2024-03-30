import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import errorResponse from "../../utils/errorResponse";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dadjoke")
    .setDescription("Tells you a dad joke"),
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: false });

    const headers = new Headers({
      Accept: "application/json",
    });

    const requestOptions = {
      method: "GET",
      headers,
    };

    try {
      const request = await fetch("https://icanhazdadjoke.com", requestOptions);
      const data = await request.json();
      return await interaction.editReply(`${data.joke}`);
    } catch (error) {
      console.error(error);
      return await interaction.editReply(errorResponse.general);
    }
  },
};
