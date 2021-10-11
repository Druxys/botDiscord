const DiscordJs = require('discord.js');
const dotenv = require('dotenv');
const {Intents} = require("discord.js");

dotenv.config();

const client = new DiscordJs.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});
client.on('ready', () => {
    console.log('ayé')
});

client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        message.reply({
            content: 'pong'
        })
    }
})
client.login(process.env.TOKEN);
