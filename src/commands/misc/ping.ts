import { SlashCommandBuilder } from "discord.js";
import { CommandInteraction } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with the bot latency"),
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: false });
    const sent = await interaction.editReply({
      content: "Pinging...",
    });

    return await interaction.editReply(
      `Roundtrip latency: ${
        sent.createdTimestamp - interaction.createdTimestamp
      } ms.`
    );
  },
};
