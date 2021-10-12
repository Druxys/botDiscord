const DiscordJs = require('discord.js');
const dotenv = require('dotenv');
const {Intents, VoiceState, ThreadChannel} = require("discord.js");

dotenv.config();

var unsuedVar = null;

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

client.on('messageCreate', (message) => {
    if (message.content === '/roulette') {
        var nb = Math.floor(Math.random() * 7);
        if (nb === 6) {
            message.member.voice.disconnect("CHEH").then(r =>
                message.reply({
                 content: '**PAN**'
                })
            );
        }else{
            message.reply({
                content: '*click*'
            })
        }

    }
})
client.login(process.env.TOKEN);
