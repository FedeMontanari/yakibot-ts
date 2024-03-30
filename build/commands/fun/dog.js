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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dogEmbedBuilder_1 = __importDefault(require("../../utils/dogEmbedBuilder"));
const { DOG_KEY } = process.env;
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("dog")
        .setDescription("Get a random dog breed info and pic"),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: false });
            const headers = new Headers({
                "x-api-key": DOG_KEY || "",
            });
            const requestOptions = {
                method: "GET",
                headers,
            };
            try {
                const info = yield fetch("https://api.thedogapi.com/v1/images/search?has_breeds=1", requestOptions);
                const data = yield info.json();
                yield interaction.editReply({
                    embeds: [(0, dogEmbedBuilder_1.default)(data)],
                });
            }
            catch (error) {
                console.error(error);
                return yield interaction.editReply("૮ ⚆ﻌ⚆ა OH NO! An error ocurred.");
            }
        });
    },
};
