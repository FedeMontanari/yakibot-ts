import { EmbedBuilder } from "discord.js";
import { UrbanDefinition } from "../types/UrbanApi";

export default function UrbanEmbedBuilder(data: UrbanDefinition) {
  let example, definition;

  if (data.example.length >= 1024) {
    example = data.example
      .slice(0, 970)
      .concat(`... [Read more...](${data.permalink})`);
  }
  if (data.definition.length >= 1011) {
    definition = data.definition
      .slice(0, 970)
      .concat(`... [Read more...](${data.permalink})`);
  }
  const newEmbed = new EmbedBuilder()
    .setColor("#1D2439")
    .setAuthor({
      name: "Urban Dictionary",
      iconURL:
        "https://cdn.discordapp.com/attachments/1030982822707605504/1136731637837733979/2a6b7de9abd420b85e951888ebc69d25-2962644108.jpeg",
    })
    .setURL(`${data.permalink || ":question:"}`)
    .setTitle(`${data.word || ":question:"}`)
    .addFields(
      {
        name: "Thumbs Up :thumbsup:",
        value: `${data.thumbs_up || ":question:"}`,
        inline: true,
      },
      {
        name: "Thumbs Down :thumbsdown:",
        value: `${data.thumbs_down || ":question:"}`,
        inline: true,
      },
      {
        name: "Author :book:",
        value: `${data.author || ":question:"}`,
        inline: true,
      },
      {
        name: "Definition",
        value: `${definition || data.definition}`,
      },
      {
        name: "Example",
        value: `${example || data.example}`,
      }
    )
    .setTimestamp();
  return newEmbed;
}
