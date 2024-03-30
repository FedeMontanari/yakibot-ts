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
const errorResponse_1 = __importDefault(require("../../utils/errorResponse"));
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("dadjoke")
        .setDescription("Tells you a dad joke"),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: false });
            const headers = new Headers({
                Accept: "application/json",
            });
            const requestOptions = {
                method: "GET",
                headers,
            };
            try {
                const request = yield fetch("https://icanhazdadjoke.com", requestOptions);
                const data = yield request.json();
                return yield interaction.editReply(`${data.joke}`);
            }
            catch (error) {
                console.error(error);
                return yield interaction.editReply(errorResponse_1.default.general);
            }
        });
    },
};
