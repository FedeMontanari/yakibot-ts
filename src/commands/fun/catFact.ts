import { SlashCommandBuilder, CommandInteraction, quote } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("catfact")
    .setDescription("Get a random cat fact!"),
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: false });

    const userLocale = interaction.locale.split("-")[0];

    let lang;

    switch (userLocale) {
      case "cs":
        lang = "cze";
        break;
      case "de":
        lang = "ger";
        break;
      case "es":
        lang = "esp";
        break;
      case "ru":
        lang = "rus";
        break;
      case "pt":
        lang = "por";
        break;
      case "uk":
        lang = "ukr";
        break;
      case "it":
        lang = "ita";
        break;
      case "zh":
        lang = "zho";
        break;
      case "ko":
        lang = "kor";
        break;
      default:
        lang = "eng";
        break;
    }

    try {
      const info = await fetch(`https://meowfacts.herokuapp.com/?lang=${lang}`);
      const data = await info.json();

      await interaction.editReply(`${quote(data.data[0])}`);
    } catch (error) {
      console.error(error);
      return await interaction.editReply(
        "An error ocurred. But did you know that cats are cute? ≽^•⩊•^≼ "
      );
    }
  },
};
