import { SlashCommandBuilder, CommandInteraction } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get information about basic commands"),
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: false });
  },
};
