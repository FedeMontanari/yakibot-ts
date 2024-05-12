import {
  SlashCommandBuilder,
  CommandInteraction,
  SlashCommandStringOption,
} from "discord.js";
import errorResponse from "../../utils/errorResponse";
import { UrbanResponse } from "../../types/UrbanApi";
import UrbanEmbedBuilder from "../../utils/urbanEmbedBuilder";

const { URBAN_API, URBAN_HOST } = process.env;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("define")
    .setDescription("Search for a term definition from the Urban Dictionary.")
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("term")
        .setDescription("The term to search for...")
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: false });

    const term = interaction.options.get("term");

    const headers = new Headers({
      "X-RapidAPI-Key": URBAN_API!,
      "X-RapidAPI-Host": URBAN_HOST!,
    });

    const requestOptions = {
      method: "GET",
      headers,
    };

    try {
      if (term?.value) {
        const res = await fetch(
          `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${term.value}`,
          requestOptions
        );
        const data: UrbanResponse = await res.json();
        const sorted = data.list.sort((a, b) => b.thumbs_up - a.thumbs_up);
        return await interaction.editReply({
          embeds: [UrbanEmbedBuilder(sorted[0])],
        });
      }
    } catch (error) {
      console.error(error);
      return await interaction.editReply(errorResponse.general);
    }
  },
};
