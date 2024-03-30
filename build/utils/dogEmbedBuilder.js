"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
function DogEmbedBuilder(dog) {
    const breed = dog[0].breeds[0];
    const newEmbed = new discord_js_1.EmbedBuilder()
        .setColor("#800080")
        .setAuthor({
        name: "The Dog Api",
        iconURL: "https://cdn.discordapp.com/attachments/1091205360183947354/1131332787367051324/154-1542297_transparent-background-dog-icon-hd-png-download-713523227.png",
    })
        .setTitle(`${breed.name || ":question:"}`)
        .addFields({
        name: "Height :straight_ruler:",
        value: `${breed.height.metric || ":question:"} cm.
           ${breed.height.imperial || ":question:"} in.`,
        inline: true,
    }, {
        name: "Weight :muscle:",
        value: `${breed.weight.metric || ":question:"} kg.
           ${breed.weight.imperial || ":question:"} lb.`,
        inline: true,
    }, {
        name: "Lifespan :heart:",
        value: `${breed.life_span || ":question:"}`,
        inline: true,
    }, {
        name: "Bred for",
        value: `${breed.bred_for || ":question:"}`,
        inline: true,
    }, {
        name: "Temperament :brain:",
        value: `${breed.temperament || ":question:"}`,
    })
        .setImage(dog[0].url)
        .setTimestamp()
        .setFooter({
        text: "Credit: http://www.thedogapi.com/",
    });
    return newEmbed;
}
exports.default = DogEmbedBuilder;
