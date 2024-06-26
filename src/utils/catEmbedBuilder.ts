import { EmbedBuilder } from "discord.js";
import { CatApi } from "../types/CatApi";

export default function CatEmbedBuilder(cat: CatApi[]) {
  const breed = cat[0].breeds[0];
  const newEmbed = new EmbedBuilder()
    .setColor("#FFC0CB")
    .setAuthor({
      name: "The Cat Api",
      iconURL:
        "https://cdn.discordapp.com/attachments/1091205360183947354/1131317204483330108/il_794xN.png",
    })
    .setURL(`${breed.wikipedia_url || ":question:"}`)
    .setTitle(`${breed.name || ":question:"}`)
    .setDescription(`${breed.description || ":question:"}`)
    .addFields(
      {
        name: `Origin :flag_${
          breed.country_code.toLowerCase() || ":question:"
        }`,
        value: `${breed.origin || ":question:"}`,
      },
      {
        name: "Lifespan :heart:",
        value: `${breed.life_span || ":question:"}`,
        inline: true,
      },
      {
        name: "Weight :muscle:",
        value: `${breed.weight.metric || ":question:"} kg.
        ${breed.weight.imperial || ":question:"} lb.`,
        inline: true,
      },
      {
        name: "Temperament :brain:",
        value: `${breed.temperament || ":question:"}`,
      }
    )
    .setImage(cat[0].url)
    .setTimestamp()
    .setFooter({
      text: "Credit: http://thecatapi.com/",
    });
  return newEmbed;
}
