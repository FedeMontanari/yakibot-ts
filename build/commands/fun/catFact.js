"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("catfact")
        .setDescription("Get a random cat fact!"),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: false });
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
                const info = yield fetch(`https://meowfacts.herokuapp.com/?lang=${lang}`);
                const data = yield info.json();
                yield interaction.editReply(`${(0, discord_js_1.quote)(data.data[0])}`);
            }
            catch (error) {
                console.error(error);
                return yield interaction.editReply("An error ocurred. But did you know that cats are cute? ≽^•⩊•^≼ ");
            }
        });
    },
};
