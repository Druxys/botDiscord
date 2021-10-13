const DiscordJs = require('discord.js');
const dotenv = require('dotenv');
const {Intents, VoiceState, ThreadChannel} = require("discord.js");
const {createAudioPlayer, createAudioResource, StreamType, entersState, AudioPlayerStatus, joinVoiceChannel,
    VoiceConnectionStatus
} = require("@discordjs/voice");

dotenv.config();

const client = new DiscordJs.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

const player = createAudioPlayer();

function playSong(src) {
    const resource = createAudioResource('./assets/songs/'+src, {
        inputType: StreamType.Arbitrary,
    });

    player.play(resource);

    return entersState(player, AudioPlayerStatus.Playing, 5e3);
}

async function connectToChannel(channel) {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

    try {
        await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
        return connection;
    } catch (error) {
        connection.destroy();
        throw error;
    }
}

client.on('ready', async () => {
    console.log('Discord.js client is ready!');
    try {
        console.log('Song is ready to play!');
    } catch (error) {
        console.error(error);
    }
});

client.on('messageCreate', async (message) => {
    if (message.content === '/roulette') {
        var nb = Math.floor(Math.random() * 7);
        let channel = message.member.voice.channel;
        if (channel) {
            try {
                const connection = await connectToChannel(channel);
                connection.subscribe(player);
                message.reply('Playing now!');
            } catch (error) {
                console.error(error);
            }
        } else {
            message.reply('Join a voice channel then try again!');
        }
        if (nb === 6) {
            message.member.voice.disconnect("CHEH").then(r =>
                playSong('44-magnum.mp3'),
            );
        } else {
            playSong('emptygun.mp3');
        }
    }
})

client.login(process.env.TOKEN);
