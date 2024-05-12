import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import DogEmbedBuilder from "../../utils/dogEmbedBuilder";

const { DOG_API } = process.env;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dog")
    .setDescription("Get a random dog breed info and pic"),
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: false });

    const headers = new Headers({
      "x-api-key": DOG_API!,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "GET",
      headers,
    };

    try {
      const info = await fetch(
        "https://api.thedogapi.com/v1/images/search?has_breeds=1",
        requestOptions
      );
      const data = await info.json();
      await interaction.editReply({
        embeds: [DogEmbedBuilder(data)],
      });
    } catch (error) {
      console.error(error);
      return await interaction.editReply("૮ ⚆ﻌ⚆ა OH NOES! An error ocurred.");
    }
  },
};
