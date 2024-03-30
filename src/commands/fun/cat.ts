import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import CatEmbedBuilder from "../../utils/catEmbedBuilder";

const { CAT_API } = process.env;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Get a random cat breed info and picture"),
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: false });

    const headers = new Headers({
      "Content-Type": "application/json",
      "x-api-key": CAT_API || "",
    });

    const requestOptions = {
      method: "GET",
      headers,
    };
    try {
      const info = await fetch(
        "https://api.thecatapi.com/v1/images/search?has_breeds=1",
        requestOptions
      );
      const data = await info.json();

      return await interaction.editReply({
        embeds: [CatEmbedBuilder(data)],
      });
    } catch (error) {
      console.error(error);
      return await interaction.editReply(
        "An error ocurred. But here's a cute cat anyways ≽^•⩊•^≼ "
      );
    }
  },
};
